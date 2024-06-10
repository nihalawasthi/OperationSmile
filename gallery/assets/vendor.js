var e = Object.defineProperty
    , t = Object.defineProperties
    , s = Object.getOwnPropertyDescriptors
    , i = Object.getOwnPropertySymbols
    , r = Object.prototype.hasOwnProperty
    , a = Object.prototype.propertyIsEnumerable
    , n = (t, s, i) => s in t ? e(t, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i
    }) : t[s] = i
    , l = (e, t) => {
        for (var s in t || (t = {}))
            r.call(t, s) && n(e, s, t[s]);
        if (i)
            for (var s of i(t))
                a.call(t, s) && n(e, s, t[s]);
        return e
    }
    , o = (e, i) => t(e, s(i));
function d(e) {
    return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
}
function c(e, t) {
    void 0 === e && (e = {}),
        void 0 === t && (t = {}),
        Object.keys(t).forEach((s => {
            void 0 === e[s] ? e[s] = t[s] : d(t[s]) && d(e[s]) && Object.keys(t[s]).length > 0 && c(e[s], t[s])
        }
        ))
}
const p = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: ""
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({
        initEvent() { }
    }),
    createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() { },
        getElementsByTagName: () => []
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};
function u() {
    const e = "undefined" != typeof document ? document : {};
    return c(e, p),
        e
}
const m = {
    document: p,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() { },
        pushState() { },
        go() { },
        back() { }
    },
    CustomEvent: function () {
        return this
    },
    addEventListener() { },
    removeEventListener() { },
    getComputedStyle: () => ({
        getPropertyValue: () => ""
    }),
    Image() { },
    Date() { },
    screen: {},
    setTimeout() { },
    clearTimeout() { },
    matchMedia: () => ({}),
    requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(),
        null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e)
    }
};
function h() {
    const e = "undefined" != typeof window ? window : {};
    return c(e, m),
        e
}
function f(e, t) {
    return void 0 === t && (t = 0),
        setTimeout(e, t)
}
function g() {
    return Date.now()
}
function v(e, t) {
    void 0 === t && (t = "x");
    const s = h();
    let i, r, a;
    const n = function (e) {
        const t = h();
        let s;
        return t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
    }(e);
    return s.WebKitCSSMatrix ? (r = n.transform || n.webkitTransform,
        r.split(",").length > 6 && (r = r.split(", ").map((e => e.replace(",", "."))).join(", ")),
        a = new s.WebKitCSSMatrix("none" === r ? "" : r)) : (a = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
            i = a.toString().split(",")),
        "x" === t && (r = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
        "y" === t && (r = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
        r || 0
}
function w(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
}
function b(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
}
function S() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0])
        , t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
        const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        if (null != i && !b(i)) {
            const s = Object.keys(Object(i)).filter((e => t.indexOf(e) < 0));
            for (let t = 0, r = s.length; t < r; t += 1) {
                const r = s[t]
                    , a = Object.getOwnPropertyDescriptor(i, r);
                void 0 !== a && a.enumerable && (w(e[r]) && w(i[r]) ? i[r].__swiper__ ? e[r] = i[r] : S(e[r], i[r]) : !w(e[r]) && w(i[r]) ? (e[r] = {},
                    i[r].__swiper__ ? e[r] = i[r] : S(e[r], i[r])) : e[r] = i[r])
            }
        }
    }
    return e
}
function T(e, t, s) {
    e.style.setProperty(t, s)
}
function y(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const r = h()
        , a = -t.translate;
    let n, l = null;
    const o = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none",
        r.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > a ? "next" : "prev"
        , c = (e, t) => "next" === d && e >= t || "prev" === d && e <= t
        , p = () => {
            n = (new Date).getTime(),
                null === l && (l = n);
            const e = Math.max(Math.min((n - l) / o, 1), 0)
                , d = .5 - Math.cos(e * Math.PI) / 2;
            let u = a + d * (s - a);
            if (c(u, s) && (u = s),
                t.wrapperEl.scrollTo({
                    [i]: u
                }),
                c(u, s))
                return t.wrapperEl.style.overflow = "hidden",
                    t.wrapperEl.style.scrollSnapType = "",
                    setTimeout((() => {
                        t.wrapperEl.style.overflow = "",
                            t.wrapperEl.scrollTo({
                                [i]: u
                            })
                    }
                    )),
                    void r.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = r.requestAnimationFrame(p)
        }
        ;
    p()
}
function x(e, t) {
    return void 0 === t && (t = ""),
        [...e.children].filter((e => e.matches(t)))
}
function E(e) {
    try {
        return void console.warn(e)
    } catch (t) { }
}
function C(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...Array.isArray(t) ? t : function (e) {
        return void 0 === e && (e = ""),
            e.trim().split(" ").filter((e => !!e.trim()))
    }(t)),
        s
}
function M(e, t) {
    return h().getComputedStyle(e, null).getPropertyValue(t)
}
function P(e) {
    let t, s = e;
    if (s) {
        for (t = 0; null !== (s = s.previousSibling);)
            1 === s.nodeType && (t += 1);
        return t
    }
}
function L(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i;)
        t ? i.matches(t) && s.push(i) : s.push(i),
            i = i.parentElement;
    return s
}
function k(e, t, s) {
    const i = h();
    return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
}
let I, A, O;
function z() {
    return I || (I = function () {
        const e = h()
            , t = u();
        return {
            smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
            touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        }
    }()),
        I
}
function G(e) {
    return void 0 === e && (e = {}),
        A || (A = function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const s = z()
                , i = h()
                , r = i.navigator.platform
                , a = t || i.navigator.userAgent
                , n = {
                    ios: !1,
                    android: !1
                }
                , l = i.screen.width
                , o = i.screen.height
                , d = a.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = a.match(/(iPad).*OS\s([\d_]+)/);
            const p = a.match(/(iPod)(.*OS\s([\d_]+))?/)
                , u = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
                , m = "Win32" === r;
            let f = "MacIntel" === r;
            return !c && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${o}`) >= 0 && (c = a.match(/(Version)\/([\d.]+)/),
                c || (c = [0, 1, "13_0_0"]),
                f = !1),
                d && !m && (n.os = "android",
                    n.android = !0),
                (c || u || p) && (n.os = "ios",
                    n.ios = !0),
                n
        }(e)),
        A
}
function D() {
    return O || (O = function () {
        const e = h();
        let t = !1;
        function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
        }
        if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
                const [e, i] = s.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
                t = e < 16 || 16 === e && i < 2
            }
        }
        return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
        }
    }()),
        O
}
const $ = (e, t) => {
    if (!e || e.destroyed || !e.params)
        return;
    const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
    if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => {
            s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),
                t && t.remove())
        }
        ))),
            t && t.remove()
    }
}
    , _ = (e, t) => {
        if (!e.slides[t])
            return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading")
    }
    , B = e => {
        if (!e || e.destroyed || !e.params)
            return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0)
            return;
        t = Math.min(t, s);
        const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView)
            , r = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
            const s = r
                , a = [s - t];
            return a.push(...Array.from({
                length: t
            }).map(((e, t) => s + i + t))),
                void e.slides.forEach(((t, s) => {
                    a.includes(t.column) && _(e, s)
                }
                ))
        }
        const a = r + i - 1;
        if (e.params.rewind || e.params.loop)
            for (let n = r - t; n <= a + t; n += 1) {
                const t = (n % s + s) % s;
                (t < r || t > a) && _(e, t)
            }
        else
            for (let n = Math.max(r - t, 0); n <= Math.min(a + t, s - 1); n += 1)
                n !== r && (n > a || n < r) && _(e, n)
    }
    ;
function V(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: r } = e;
    const { activeIndex: a, previousIndex: n } = t;
    let l = i;
    if (l || (l = a > n ? "next" : a < n ? "prev" : "reset"),
        t.emit(`transition${r}`),
        s && a !== n) {
        if ("reset" === l)
            return void t.emit(`slideResetTransition${r}`);
        t.emit(`slideChangeTransition${r}`),
            "next" === l ? t.emit(`slideNextTransition${r}`) : t.emit(`slidePrevTransition${r}`)
    }
}
function F(e, t, s) {
    const i = h()
        , { params: r } = e
        , a = r.edgeSwipeDetection
        , n = r.edgeSwipeThreshold;
    return !a || !(s <= n || s >= i.innerWidth - n) || "prevent" === a && (t.preventDefault(),
        !0)
}
function N(e) {
    const t = this
        , s = u();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const r = t.touchEventsData;
    if ("pointerdown" === i.type) {
        if (null !== r.pointerId && r.pointerId !== i.pointerId)
            return;
        r.pointerId = i.pointerId
    } else
        "touchstart" === i.type && 1 === i.targetTouches.length && (r.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type)
        return void F(t, i, i.targetTouches[0].pageX);
    const { params: a, touches: n, enabled: l } = t;
    if (!l)
        return;
    if (!a.simulateTouch && "mouse" === i.pointerType)
        return;
    if (t.animating && a.preventInteractionOnTransition)
        return;
    !t.animating && a.cssMode && a.loop && t.loopFix();
    let o = i.target;
    if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(o))
        return;
    if ("which" in i && 3 === i.which)
        return;
    if ("button" in i && i.button > 0)
        return;
    if (r.isTouched && r.isMoved)
        return;
    const d = !!a.noSwipingClass && "" !== a.noSwipingClass
        , c = i.composedPath ? i.composedPath() : i.path;
    d && i.target && i.target.shadowRoot && c && (o = c[0]);
    const p = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`
        , m = !(!i.target || !i.target.shadowRoot);
    if (a.noSwiping && (m ? function (e, t) {
        return void 0 === t && (t = this),
            function t(s) {
                if (!s || s === u() || s === h())
                    return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null
            }(t)
    }(p, o) : o.closest(p)))
        return void (t.allowClick = !0);
    if (a.swipeHandler && !o.closest(a.swipeHandler))
        return;
    n.currentX = i.pageX,
        n.currentY = i.pageY;
    const f = n.currentX
        , v = n.currentY;
    if (!F(t, i, f))
        return;
    Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }),
        n.startX = f,
        n.startY = v,
        r.touchStartTime = g(),
        t.allowClick = !0,
        t.updateSize(),
        t.swipeDirection = void 0,
        a.threshold > 0 && (r.allowThresholdMove = !1);
    let w = !0;
    o.matches(r.focusableElements) && (w = !1,
        "SELECT" === o.nodeName && (r.isTouched = !1)),
        s.activeElement && s.activeElement.matches(r.focusableElements) && s.activeElement !== o && s.activeElement.blur();
    const b = w && t.allowTouchMove && a.touchStartPreventDefault;
    !a.touchStartForcePreventDefault && !b || o.isContentEditable || i.preventDefault(),
        a.freeMode && a.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(),
        t.emit("touchStart", i)
}
function H(e) {
    const t = u()
        , s = this
        , i = s.touchEventsData
        , { params: r, touches: a, rtlTranslate: n, enabled: l } = s;
    if (!l)
        return;
    if (!r.simulateTouch && "mouse" === e.pointerType)
        return;
    let o, d = e;
    if (d.originalEvent && (d = d.originalEvent),
        "pointermove" === d.type) {
        if (null !== i.touchId)
            return;
        if (d.pointerId !== i.pointerId)
            return
    }
    if ("touchmove" === d.type) {
        if (o = [...d.changedTouches].filter((e => e.identifier === i.touchId))[0],
            !o || o.identifier !== i.touchId)
            return
    } else
        o = d;
    if (!i.isTouched)
        return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", d));
    const c = o.pageX
        , p = o.pageY;
    if (d.preventedByNestedSwiper)
        return a.startX = c,
            void (a.startY = p);
    if (!s.allowTouchMove)
        return d.target.matches(i.focusableElements) || (s.allowClick = !1),
            void (i.isTouched && (Object.assign(a, {
                startX: c,
                startY: p,
                currentX: c,
                currentY: p
            }),
                i.touchStartTime = g()));
    if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
            if (p < a.startY && s.translate <= s.maxTranslate() || p > a.startY && s.translate >= s.minTranslate())
                return i.isTouched = !1,
                    void (i.isMoved = !1)
        } else if (c < a.startX && s.translate <= s.maxTranslate() || c > a.startX && s.translate >= s.minTranslate())
            return;
    if (t.activeElement && d.target === t.activeElement && d.target.matches(i.focusableElements))
        return i.isMoved = !0,
            void (s.allowClick = !1);
    i.allowTouchCallbacks && s.emit("touchMove", d),
        a.previousX = a.currentX,
        a.previousY = a.currentY,
        a.currentX = c,
        a.currentY = p;
    const m = a.currentX - a.startX
        , h = a.currentY - a.startY;
    if (s.params.threshold && Math.sqrt(m ** 2 + h ** 2) < s.params.threshold)
        return;
    if (void 0 === i.isScrolling) {
        let e;
        s.isHorizontal() && a.currentY === a.startY || s.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : m * m + h * h >= 25 && (e = 180 * Math.atan2(Math.abs(h), Math.abs(m)) / Math.PI,
            i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
    }
    if (i.isScrolling && s.emit("touchMoveOpposite", d),
        void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)),
        i.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled)
        return void (i.isTouched = !1);
    if (!i.startMoving)
        return;
    s.allowClick = !1,
        !r.cssMode && d.cancelable && d.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && d.stopPropagation();
    let f = s.isHorizontal() ? m : h
        , v = s.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
    r.oneWayMovement && (f = Math.abs(f) * (n ? 1 : -1),
        v = Math.abs(v) * (n ? 1 : -1)),
        a.diff = f,
        f *= r.touchRatio,
        n && (f = -f,
            v = -v);
    const w = s.touchesDirection;
    s.swipeDirection = f > 0 ? "prev" : "next",
        s.touchesDirection = v > 0 ? "prev" : "next";
    const b = s.params.loop && !r.cssMode
        , S = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev;
    if (!i.isMoved) {
        if (b && S && s.loopFix({
            direction: s.swipeDirection
        }),
            i.startTranslate = s.getTranslate(),
            s.setTransition(0),
            s.animating) {
            const e = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0
            });
            s.wrapperEl.dispatchEvent(e)
        }
        i.allowMomentumBounce = !1,
            !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0),
            s.emit("sliderFirstMove", d)
    }
    if ((new Date).getTime(),
        i.isMoved && i.allowThresholdMove && w !== s.touchesDirection && b && S && Math.abs(f) >= 1)
        return Object.assign(a, {
            startX: c,
            startY: p,
            currentX: c,
            currentY: p,
            startTranslate: i.currentTranslate
        }),
            i.loopSwapReset = !0,
            void (i.startTranslate = i.currentTranslate);
    s.emit("sliderMove", d),
        i.isMoved = !0,
        i.currentTranslate = f + i.startTranslate;
    let T = !0
        , y = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (y = 0),
        f > 0 ? (b && S && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }),
            i.currentTranslate > s.minTranslate() && (T = !1,
                r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + f) ** y))) : f < 0 && (b && S && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] : s.maxTranslate()) && s.loopFix({
                    direction: "next",
                    setTranslate: !0,
                    activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
                }),
                    i.currentTranslate < s.maxTranslate() && (T = !1,
                        r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - f) ** y))),
        T && (d.preventedByNestedSwiper = !0),
        !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
        r.threshold > 0) {
        if (!(Math.abs(f) > r.threshold || i.allowThresholdMove))
            return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
            return i.allowThresholdMove = !0,
                a.startX = a.currentX,
                a.startY = a.currentY,
                i.currentTranslate = i.startTranslate,
                void (a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
    }
    r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(),
        s.updateSlidesClasses()),
        r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate))
}
function j(e) {
    const t = this
        , s = t.touchEventsData;
    let i, r = e;
    r.originalEvent && (r = r.originalEvent);
    if ("touchend" === r.type || "touchcancel" === r.type) {
        if (i = [...r.changedTouches].filter((e => e.identifier === s.touchId))[0],
            !i || i.identifier !== s.touchId)
            return
    } else {
        if (null !== s.touchId)
            return;
        if (r.pointerId !== s.pointerId)
            return;
        i = r
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(r.type)) {
        if (!(["pointercancel", "contextmenu"].includes(r.type) && (t.browser.isSafari || t.browser.isWebView)))
            return
    }
    s.pointerId = null,
        s.touchId = null;
    const { params: a, touches: n, rtlTranslate: l, slidesGrid: o, enabled: d } = t;
    if (!d)
        return;
    if (!a.simulateTouch && "mouse" === r.pointerType)
        return;
    if (s.allowTouchCallbacks && t.emit("touchEnd", r),
        s.allowTouchCallbacks = !1,
        !s.isTouched)
        return s.isMoved && a.grabCursor && t.setGrabCursor(!1),
            s.isMoved = !1,
            void (s.startMoving = !1);
    a.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    const c = g()
        , p = c - s.touchStartTime;
    if (t.allowClick) {
        const e = r.path || r.composedPath && r.composedPath();
        t.updateClickedSlide(e && e[0] || r.target, e),
            t.emit("tap click", r),
            p < 300 && c - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", r)
    }
    if (s.lastClickTime = g(),
        f((() => {
            t.destroyed || (t.allowClick = !0)
        }
        )),
        !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset)
        return s.isTouched = !1,
            s.isMoved = !1,
            void (s.startMoving = !1);
    let u;
    if (s.isTouched = !1,
        s.isMoved = !1,
        s.startMoving = !1,
        u = a.followFinger ? l ? t.translate : -t.translate : -s.currentTranslate,
        a.cssMode)
        return;
    if (a.freeMode && a.freeMode.enabled)
        return void t.freeMode.onTouchEnd({
            currentPos: u
        });
    let m = 0
        , h = t.slidesSizesGrid[0];
    for (let f = 0; f < o.length; f += f < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
        const e = f < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        void 0 !== o[f + e] ? u >= o[f] && u < o[f + e] && (m = f,
            h = o[f + e] - o[f]) : u >= o[f] && (m = f,
                h = o[o.length - 1] - o[o.length - 2])
    }
    let v = null
        , w = null;
    a.rewind && (t.isBeginning ? w = a.virtual && a.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (v = 0));
    const b = (u - o[m]) / h
        , S = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (p > a.longSwipesMs) {
        if (!a.longSwipes)
            return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (b >= a.longSwipesRatio ? t.slideTo(a.rewind && t.isEnd ? v : m + S) : t.slideTo(m)),
            "prev" === t.swipeDirection && (b > 1 - a.longSwipesRatio ? t.slideTo(m + S) : null !== w && b < 0 && Math.abs(b) > a.longSwipesRatio ? t.slideTo(w) : t.slideTo(m))
    } else {
        if (!a.shortSwipes)
            return void t.slideTo(t.activeIndex);
        t.navigation && (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl) ? r.target === t.navigation.nextEl ? t.slideTo(m + S) : t.slideTo(m) : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : m + S),
            "prev" === t.swipeDirection && t.slideTo(null !== w ? w : m))
    }
}
function R() {
    const e = this
        , { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth)
        return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: r, snapGrid: a } = e
        , n = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
    const l = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
            e.autoplay.resizeTimeout = setTimeout((() => {
                e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
            }
            ), 500)),
        e.allowSlidePrev = r,
        e.allowSlideNext = i,
        e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow()
}
function q(e) {
    const t = this;
    t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
            e.stopImmediatePropagation())))
}
function W() {
    const e = this
        , { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i)
        return;
    let r;
    e.previousTranslate = e.translate,
        e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    r = 0 === a ? 0 : (e.translate - e.minTranslate()) / a,
        r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1)
}
function Y(e) {
    const t = this;
    $(t, e.target),
        t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
}
function X() {
    const e = this;
    e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0,
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
}
const U = (e, t) => {
    const s = u()
        , { params: i, el: r, wrapperEl: a, device: n } = e
        , l = !!i.nested
        , o = "on" === t ? "addEventListener" : "removeEventListener"
        , d = t;
    s[o]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: l
    }),
        r[o]("touchstart", e.onTouchStart, {
            passive: !1
        }),
        r[o]("pointerdown", e.onTouchStart, {
            passive: !1
        }),
        s[o]("touchmove", e.onTouchMove, {
            passive: !1,
            capture: l
        }),
        s[o]("pointermove", e.onTouchMove, {
            passive: !1,
            capture: l
        }),
        s[o]("touchend", e.onTouchEnd, {
            passive: !0
        }),
        s[o]("pointerup", e.onTouchEnd, {
            passive: !0
        }),
        s[o]("pointercancel", e.onTouchEnd, {
            passive: !0
        }),
        s[o]("touchcancel", e.onTouchEnd, {
            passive: !0
        }),
        s[o]("pointerout", e.onTouchEnd, {
            passive: !0
        }),
        s[o]("pointerleave", e.onTouchEnd, {
            passive: !0
        }),
        s[o]("contextmenu", e.onTouchEnd, {
            passive: !0
        }),
        (i.preventClicks || i.preventClicksPropagation) && r[o]("click", e.onClick, !0),
        i.cssMode && a[o]("scroll", e.onScroll),
        i.updateOnWindowResize ? e[d](n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", R, !0) : e[d]("observerUpdate", R, !0),
        r[o]("load", e.onLoad, {
            capture: !0
        })
}
    ;
const K = (e, t) => e.grid && t.grid && t.grid.rows > 1;
var J = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
};
function Q(e, t) {
    return function (s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0]
            , r = s[i];
        "object" == typeof r && null !== r ? (!0 === e[i] && (e[i] = {
            enabled: !0
        }),
            "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0),
            ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0),
            i in e && "enabled" in r ? ("object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0),
                e[i] || (e[i] = {
                    enabled: !1
                }),
                S(t, s)) : S(t, s)) : S(t, s)
    }
}
const Z = {
    eventsEmitter: {
        on(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            const r = s ? "unshift" : "push";
            return e.split(" ").forEach((e => {
                i.eventsListeners[e] || (i.eventsListeners[e] = []),
                    i.eventsListeners[e][r](t)
            }
            )),
                i
        },
        once(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            function r() {
                i.off(e, r),
                    r.__emitterProxy && delete r.__emitterProxy;
                for (var s = arguments.length, a = new Array(s), n = 0; n < s; n++)
                    a[n] = arguments[n];
                t.apply(i, a)
            }
            return r.__emitterProxy = t,
                i.on(e, r, s)
        },
        onAny(e, t) {
            const s = this;
            if (!s.eventsListeners || s.destroyed)
                return s;
            if ("function" != typeof e)
                return s;
            const i = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
                s
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed)
                return t;
            if (!t.eventsAnyListeners)
                return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1),
                t
        },
        off(e, t) {
            const s = this;
            return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => {
                void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i, r) => {
                    (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(r, 1)
                }
                ))
            }
            )),
                s) : s
        },
        emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed)
                return e;
            if (!e.eventsListeners)
                return e;
            let t, s, i;
            for (var r = arguments.length, a = new Array(r), n = 0; n < r; n++)
                a[n] = arguments[n];
            "string" == typeof a[0] || Array.isArray(a[0]) ? (t = a[0],
                s = a.slice(1, a.length),
                i = e) : (t = a[0].events,
                    s = a[0].data,
                    i = a[0].context || e),
                s.unshift(i);
            return (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
                e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
                    e.apply(i, [t, ...s])
                }
                )),
                    e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
                        e.apply(i, s)
                    }
                    ))
            }
            )),
                e
        }
    },
    update: {
        updateSize: function () {
            const e = this;
            let t, s;
            const i = e.el;
            t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth,
                s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight,
                0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(M(i, "padding-left") || 0, 10) - parseInt(M(i, "padding-right") || 0, 10),
                    s = s - parseInt(M(i, "padding-top") || 0, 10) - parseInt(M(i, "padding-bottom") || 0, 10),
                    Number.isNaN(t) && (t = 0),
                    Number.isNaN(s) && (s = 0),
                    Object.assign(e, {
                        width: t,
                        height: s,
                        size: e.isHorizontal() ? t : s
                    }))
        },
        updateSlides: function () {
            const e = this;
            function t(t, s) {
                return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0)
            }
            const s = e.params
                , { wrapperEl: i, slidesEl: r, size: a, rtlTranslate: n, wrongRTL: l } = e
                , o = e.virtual && s.virtual.enabled
                , d = o ? e.virtual.slides.length : e.slides.length
                , c = x(r, `.${e.params.slideClass}, swiper-slide`)
                , p = o ? e.virtual.slides.length : c.length;
            let u = [];
            const m = []
                , h = [];
            let f = s.slidesOffsetBefore;
            "function" == typeof f && (f = s.slidesOffsetBefore.call(e));
            let g = s.slidesOffsetAfter;
            "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
            const v = e.snapGrid.length
                , w = e.slidesGrid.length;
            let b = s.spaceBetween
                , S = -f
                , y = 0
                , E = 0;
            if (void 0 === a)
                return;
            "string" == typeof b && b.indexOf("%") >= 0 ? b = parseFloat(b.replace("%", "")) / 100 * a : "string" == typeof b && (b = parseFloat(b)),
                e.virtualSize = -b,
                c.forEach((e => {
                    n ? e.style.marginLeft = "" : e.style.marginRight = "",
                        e.style.marginBottom = "",
                        e.style.marginTop = ""
                }
                )),
                s.centeredSlides && s.cssMode && (T(i, "--swiper-centered-offset-before", ""),
                    T(i, "--swiper-centered-offset-after", ""));
            const C = s.grid && s.grid.rows > 1 && e.grid;
            let P;
            C ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
            const L = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e => void 0 !== s.breakpoints[e].slidesPerView)).length > 0;
            for (let T = 0; T < p; T += 1) {
                let i;
                if (P = 0,
                    c[T] && (i = c[T]),
                    C && e.grid.updateSlide(T, i, c),
                    !c[T] || "none" !== M(i, "display")) {
                    if ("auto" === s.slidesPerView) {
                        L && (c[T].style[e.getDirectionLabel("width")] = "");
                        const r = getComputedStyle(i)
                            , a = i.style.transform
                            , n = i.style.webkitTransform;
                        if (a && (i.style.transform = "none"),
                            n && (i.style.webkitTransform = "none"),
                            s.roundLengths)
                            P = e.isHorizontal() ? k(i, "width", !0) : k(i, "height", !0);
                        else {
                            const e = t(r, "width")
                                , s = t(r, "padding-left")
                                , a = t(r, "padding-right")
                                , n = t(r, "margin-left")
                                , l = t(r, "margin-right")
                                , o = r.getPropertyValue("box-sizing");
                            if (o && "border-box" === o)
                                P = e + n + l;
                            else {
                                const { clientWidth: t, offsetWidth: r } = i;
                                P = e + s + a + n + l + (r - t)
                            }
                        }
                        a && (i.style.transform = a),
                            n && (i.style.webkitTransform = n),
                            s.roundLengths && (P = Math.floor(P))
                    } else
                        P = (a - (s.slidesPerView - 1) * b) / s.slidesPerView,
                            s.roundLengths && (P = Math.floor(P)),
                            c[T] && (c[T].style[e.getDirectionLabel("width")] = `${P}px`);
                    c[T] && (c[T].swiperSlideSize = P),
                        h.push(P),
                        s.centeredSlides ? (S = S + P / 2 + y / 2 + b,
                            0 === y && 0 !== T && (S = S - a / 2 - b),
                            0 === T && (S = S - a / 2 - b),
                            Math.abs(S) < .001 && (S = 0),
                            s.roundLengths && (S = Math.floor(S)),
                            E % s.slidesPerGroup == 0 && u.push(S),
                            m.push(S)) : (s.roundLengths && (S = Math.floor(S)),
                                (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && u.push(S),
                                m.push(S),
                                S = S + P + b),
                        e.virtualSize += P + b,
                        y = P,
                        E += 1
                }
            }
            if (e.virtualSize = Math.max(e.virtualSize, a) + g,
                n && l && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize + b}px`),
                s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + b}px`),
                C && e.grid.updateWrapperSize(P, u),
                !s.centeredSlides) {
                const t = [];
                for (let i = 0; i < u.length; i += 1) {
                    let r = u[i];
                    s.roundLengths && (r = Math.floor(r)),
                        u[i] <= e.virtualSize - a && t.push(r)
                }
                u = t,
                    Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - a)
            }
            if (o && s.loop) {
                const t = h[0] + b;
                if (s.slidesPerGroup > 1) {
                    const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup)
                        , r = t * s.slidesPerGroup;
                    for (let e = 0; e < i; e += 1)
                        u.push(u[u.length - 1] + r)
                }
                for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1)
                    1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
                        m.push(m[m.length - 1] + t),
                        e.virtualSize += t
            }
            if (0 === u.length && (u = [0]),
                0 !== b) {
                const t = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight");
                c.filter(((e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1)).forEach((e => {
                    e.style[t] = `${b}px`
                }
                ))
            }
            if (s.centeredSlides && s.centeredSlidesBounds) {
                let e = 0;
                h.forEach((t => {
                    e += t + (b || 0)
                }
                )),
                    e -= b;
                const t = e - a;
                u = u.map((e => e <= 0 ? -f : e > t ? t + g : e))
            }
            if (s.centerInsufficientSlides) {
                let e = 0;
                if (h.forEach((t => {
                    e += t + (b || 0)
                }
                )),
                    e -= b,
                    e < a) {
                    const t = (a - e) / 2;
                    u.forEach(((e, s) => {
                        u[s] = e - t
                    }
                    )),
                        m.forEach(((e, s) => {
                            m[s] = e + t
                        }
                        ))
                }
            }
            if (Object.assign(e, {
                slides: c,
                snapGrid: u,
                slidesGrid: m,
                slidesSizesGrid: h
            }),
                s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                T(i, "--swiper-centered-offset-before", -u[0] + "px"),
                    T(i, "--swiper-centered-offset-after", e.size / 2 - h[h.length - 1] / 2 + "px");
                const t = -e.snapGrid[0]
                    , s = -e.slidesGrid[0];
                e.snapGrid = e.snapGrid.map((e => e + t)),
                    e.slidesGrid = e.slidesGrid.map((e => e + s))
            }
            if (p !== d && e.emit("slidesLengthChange"),
                u.length !== v && (e.params.watchOverflow && e.checkOverflow(),
                    e.emit("snapGridLengthChange")),
                m.length !== w && e.emit("slidesGridLengthChange"),
                s.watchSlidesProgress && e.updateSlidesOffset(),
                !(o || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                const t = `${s.containerModifierClass}backface-hidden`
                    , i = e.el.classList.contains(t);
                p <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t)
            }
        },
        updateAutoHeight: function (e) {
            const t = this
                , s = []
                , i = t.virtual && t.params.virtual.enabled;
            let r, a = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const n = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    (t.visibleSlides || []).forEach((e => {
                        s.push(e)
                    }
                    ));
                else
                    for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
                        const e = t.activeIndex + r;
                        if (e > t.slides.length && !i)
                            break;
                        s.push(n(e))
                    }
            else
                s.push(n(t.activeIndex));
            for (r = 0; r < s.length; r += 1)
                if (void 0 !== s[r]) {
                    const e = s[r].offsetHeight;
                    a = e > a ? e : a
                }
            (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`)
        },
        updateSlidesOffset: function () {
            const e = this
                , t = e.slides
                , s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
            for (let i = 0; i < t.length; i += 1)
                t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
        },
        updateSlidesProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            const t = this
                , s = t.params
                , { slides: i, rtlTranslate: r, snapGrid: a } = t;
            if (0 === i.length)
                return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            r && (n = e),
                i.forEach((e => {
                    e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass)
                }
                )),
                t.visibleSlidesIndexes = [],
                t.visibleSlides = [];
            let l = s.spaceBetween;
            "string" == typeof l && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : "string" == typeof l && (l = parseFloat(l));
            for (let o = 0; o < i.length; o += 1) {
                const e = i[o];
                let d = e.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
                const c = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + l)
                    , p = (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + l)
                    , u = -(n - d)
                    , m = u + t.slidesSizesGrid[o]
                    , h = u >= 0 && u <= t.size - t.slidesSizesGrid[o];
                (u >= 0 && u < t.size - 1 || m > 1 && m <= t.size || u <= 0 && m >= t.size) && (t.visibleSlides.push(e),
                    t.visibleSlidesIndexes.push(o),
                    i[o].classList.add(s.slideVisibleClass)),
                    h && i[o].classList.add(s.slideFullyVisibleClass),
                    e.progress = r ? -c : c,
                    e.originalProgress = r ? -p : p
            }
        },
        updateProgress: function (e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = t && t.translate && t.translate * s || 0
            }
            const s = t.params
                , i = t.maxTranslate() - t.minTranslate();
            let { progress: r, isBeginning: a, isEnd: n, progressLoop: l } = t;
            const o = a
                , d = n;
            if (0 === i)
                r = 0,
                    a = !0,
                    n = !0;
            else {
                r = (e - t.minTranslate()) / i;
                const s = Math.abs(e - t.minTranslate()) < 1
                    , l = Math.abs(e - t.maxTranslate()) < 1;
                a = s || r <= 0,
                    n = l || r >= 1,
                    s && (r = 0),
                    l && (r = 1)
            }
            if (s.loop) {
                const s = t.getSlideIndexByData(0)
                    , i = t.getSlideIndexByData(t.slides.length - 1)
                    , r = t.slidesGrid[s]
                    , a = t.slidesGrid[i]
                    , n = t.slidesGrid[t.slidesGrid.length - 1]
                    , o = Math.abs(e);
                l = o >= r ? (o - r) / n : (o + n - a) / n,
                    l > 1 && (l -= 1)
            }
            Object.assign(t, {
                progress: r,
                progressLoop: l,
                isBeginning: a,
                isEnd: n
            }),
                (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e),
                a && !o && t.emit("reachBeginning toEdge"),
                n && !d && t.emit("reachEnd toEdge"),
                (o && !a || d && !n) && t.emit("fromEdge"),
                t.emit("progress", r)
        },
        updateSlidesClasses: function () {
            const e = this
                , { slides: t, params: s, slidesEl: i, activeIndex: r } = e
                , a = e.virtual && s.virtual.enabled
                , n = e.grid && s.grid && s.grid.rows > 1
                , l = e => x(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
            let o, d, c;
            if (t.forEach((e => {
                e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
            }
            )),
                a)
                if (s.loop) {
                    let t = r - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t),
                        t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                        o = l(`[data-swiper-slide-index="${t}"]`)
                } else
                    o = l(`[data-swiper-slide-index="${r}"]`);
            else
                n ? (o = t.filter((e => e.column === r))[0],
                    c = t.filter((e => e.column === r + 1))[0],
                    d = t.filter((e => e.column === r - 1))[0]) : o = t[r];
            o && (o.classList.add(s.slideActiveClass),
                n ? (c && c.classList.add(s.slideNextClass),
                    d && d.classList.add(s.slidePrevClass)) : (c = function (e, t) {
                        const s = [];
                        for (; e.nextElementSibling;) {
                            const i = e.nextElementSibling;
                            t ? i.matches(t) && s.push(i) : s.push(i),
                                e = i
                        }
                        return s
                    }(o, `.${s.slideClass}, swiper-slide`)[0],
                        s.loop && !c && (c = t[0]),
                        c && c.classList.add(s.slideNextClass),
                        d = function (e, t) {
                            const s = [];
                            for (; e.previousElementSibling;) {
                                const i = e.previousElementSibling;
                                t ? i.matches(t) && s.push(i) : s.push(i),
                                    e = i
                            }
                            return s
                        }(o, `.${s.slideClass}, swiper-slide`)[0],
                        s.loop && 0 === !d && (d = t[t.length - 1]),
                        d && d.classList.add(s.slidePrevClass))),
                e.emitSlidesClasses()
        },
        updateActiveIndex: function (e) {
            const t = this
                , s = t.rtlTranslate ? t.translate : -t.translate
                , { snapGrid: i, params: r, activeIndex: a, realIndex: n, snapIndex: l } = t;
            let o, d = e;
            const c = e => {
                let s = e - t.virtual.slidesBefore;
                return s < 0 && (s = t.virtual.slides.length + s),
                    s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
                    s
            }
                ;
            if (void 0 === d && (d = function (e) {
                const { slidesGrid: t, params: s } = e
                    , i = e.rtlTranslate ? e.translate : -e.translate;
                let r;
                for (let a = 0; a < t.length; a += 1)
                    void 0 !== t[a + 1] ? i >= t[a] && i < t[a + 1] - (t[a + 1] - t[a]) / 2 ? r = a : i >= t[a] && i < t[a + 1] && (r = a + 1) : i >= t[a] && (r = a);
                return s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0),
                    r
            }(t)),
                i.indexOf(s) >= 0)
                o = i.indexOf(s);
            else {
                const e = Math.min(r.slidesPerGroupSkip, d);
                o = e + Math.floor((d - e) / r.slidesPerGroup)
            }
            if (o >= i.length && (o = i.length - 1),
                d === a && !t.params.loop)
                return void (o !== l && (t.snapIndex = o,
                    t.emit("snapIndexChange")));
            if (d === a && t.params.loop && t.virtual && t.params.virtual.enabled)
                return void (t.realIndex = c(d));
            const p = t.grid && r.grid && r.grid.rows > 1;
            let u;
            if (t.virtual && r.virtual.enabled && r.loop)
                u = c(d);
            else if (p) {
                const e = t.slides.filter((e => e.column === d))[0];
                let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
                    u = Math.floor(s / r.grid.rows)
            } else if (t.slides[d]) {
                const e = t.slides[d].getAttribute("data-swiper-slide-index");
                u = e ? parseInt(e, 10) : d
            } else
                u = d;
            Object.assign(t, {
                previousSnapIndex: l,
                snapIndex: o,
                previousRealIndex: n,
                realIndex: u,
                previousIndex: a,
                activeIndex: d
            }),
                t.initialized && B(t),
                t.emit("activeIndexChange"),
                t.emit("snapIndexChange"),
                (t.initialized || t.params.runCallbacksOnInit) && (n !== u && t.emit("realIndexChange"),
                    t.emit("slideChange"))
        },
        updateClickedSlide: function (e, t) {
            const s = this
                , i = s.params;
            let r = e.closest(`.${i.slideClass}, swiper-slide`);
            !r && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e => {
                !r && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (r = e)
            }
            ));
            let a, n = !1;
            if (r)
                for (let l = 0; l < s.slides.length; l += 1)
                    if (s.slides[l] === r) {
                        n = !0,
                            a = l;
                        break
                    }
            if (!r || !n)
                return s.clickedSlide = void 0,
                    void (s.clickedIndex = void 0);
            s.clickedSlide = r,
                s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = a,
                i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide()
        }
    },
    translate: {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
            if (t.virtualTranslate)
                return s ? -i : i;
            if (t.cssMode)
                return i;
            let a = v(r, e);
            return a += this.cssOverflowAdjustment(),
                s && (a = -a),
                a || 0
        },
        setTranslate: function (e, t) {
            const s = this
                , { rtlTranslate: i, params: r, wrapperEl: a, progress: n } = s;
            let l, o = 0, d = 0;
            s.isHorizontal() ? o = i ? -e : e : d = e,
                r.roundLengths && (o = Math.floor(o),
                    d = Math.floor(d)),
                s.previousTranslate = s.translate,
                s.translate = s.isHorizontal() ? o : d,
                r.cssMode ? a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : r.virtualTranslate || (s.isHorizontal() ? o -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(),
                    a.style.transform = `translate3d(${o}px, ${d}px, 0px)`);
            const c = s.maxTranslate() - s.minTranslate();
            l = 0 === c ? 0 : (e - s.minTranslate()) / c,
                l !== n && s.updateProgress(e),
                s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function () {
            return -this.snapGrid[0]
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function (e, t, s, i, r) {
            void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                void 0 === i && (i = !0);
            const a = this
                , { params: n, wrapperEl: l } = a;
            if (a.animating && n.preventInteractionOnTransition)
                return !1;
            const o = a.minTranslate()
                , d = a.maxTranslate();
            let c;
            if (c = i && e > o ? o : i && e < d ? d : e,
                a.updateProgress(c),
                n.cssMode) {
                const e = a.isHorizontal();
                if (0 === t)
                    l[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                    if (!a.support.smoothScroll)
                        return y({
                            swiper: a,
                            targetPosition: -c,
                            side: e ? "left" : "top"
                        }),
                            !0;
                    l.scrollTo({
                        [e ? "left" : "top"]: -c,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return 0 === t ? (a.setTransition(0),
                a.setTranslate(c),
                s && (a.emit("beforeTransitionStart", t, r),
                    a.emit("transitionEnd"))) : (a.setTransition(t),
                        a.setTranslate(c),
                        s && (a.emit("beforeTransitionStart", t, r),
                            a.emit("transitionStart")),
                        a.animating || (a.animating = !0,
                            a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function (e) {
                                a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd),
                                    a.onTranslateToWrapperTransitionEnd = null,
                                    delete a.onTranslateToWrapperTransitionEnd,
                                    s && a.emit("transitionEnd"))
                            }
                            ),
                            a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))),
                !0
        }
    },
    transition: {
        setTransition: function (e, t) {
            const s = this;
            s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`,
                s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""),
                s.emit("setTransition", e, t)
        },
        transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const s = this
                , { params: i } = s;
            i.cssMode || (i.autoHeight && s.updateAutoHeight(),
                V({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
        },
        transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const s = this
                , { params: i } = s;
            s.animating = !1,
                i.cssMode || (s.setTransition(0),
                    V({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "End"
                    }))
        }
    },
    slide: {
        slideTo: function (e, t, s, i, r) {
            void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                "string" == typeof e && (e = parseInt(e, 10));
            const a = this;
            let n = e;
            n < 0 && (n = 0);
            const { params: l, snapGrid: o, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: m, enabled: h } = a;
            if (a.animating && l.preventInteractionOnTransition || !h && !i && !r)
                return !1;
            const f = Math.min(a.params.slidesPerGroupSkip, n);
            let g = f + Math.floor((n - f) / a.params.slidesPerGroup);
            g >= o.length && (g = o.length - 1);
            const v = -o[g];
            if (l.normalizeSlideIndex)
                for (let b = 0; b < d.length; b += 1) {
                    const e = -Math.floor(100 * v)
                        , t = Math.floor(100 * d[b])
                        , s = Math.floor(100 * d[b + 1]);
                    void 0 !== d[b + 1] ? e >= t && e < s - (s - t) / 2 ? n = b : e >= t && e < s && (n = b + 1) : e >= t && (n = b)
                }
            if (a.initialized && n !== p) {
                if (!a.allowSlideNext && (u ? v > a.translate && v > a.minTranslate() : v < a.translate && v < a.minTranslate()))
                    return !1;
                if (!a.allowSlidePrev && v > a.translate && v > a.maxTranslate() && (p || 0) !== n)
                    return !1
            }
            let w;
            if (n !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
                a.updateProgress(v),
                w = n > p ? "next" : n < p ? "prev" : "reset",
                u && -v === a.translate || !u && v === a.translate)
                return a.updateActiveIndex(n),
                    l.autoHeight && a.updateAutoHeight(),
                    a.updateSlidesClasses(),
                    "slide" !== l.effect && a.setTranslate(v),
                    "reset" !== w && (a.transitionStart(s, w),
                        a.transitionEnd(s, w)),
                    !1;
            if (l.cssMode) {
                const e = a.isHorizontal()
                    , s = u ? v : -v;
                if (0 === t) {
                    const t = a.virtual && a.params.virtual.enabled;
                    t && (a.wrapperEl.style.scrollSnapType = "none",
                        a._immediateVirtual = !0),
                        t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0 ? (a._cssModeVirtualInitialSet = !0,
                            requestAnimationFrame((() => {
                                m[e ? "scrollLeft" : "scrollTop"] = s
                            }
                            ))) : m[e ? "scrollLeft" : "scrollTop"] = s,
                        t && requestAnimationFrame((() => {
                            a.wrapperEl.style.scrollSnapType = "",
                                a._immediateVirtual = !1
                        }
                        ))
                } else {
                    if (!a.support.smoothScroll)
                        return y({
                            swiper: a,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }),
                            !0;
                    m.scrollTo({
                        [e ? "left" : "top"]: s,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return a.setTransition(t),
                a.setTranslate(v),
                a.updateActiveIndex(n),
                a.updateSlidesClasses(),
                a.emit("beforeTransitionStart", t, i),
                a.transitionStart(s, w),
                0 === t ? a.transitionEnd(s, w) : a.animating || (a.animating = !0,
                    a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function (e) {
                        a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
                            a.onSlideToWrapperTransitionEnd = null,
                            delete a.onSlideToWrapperTransitionEnd,
                            a.transitionEnd(s, w))
                    }
                    ),
                    a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)),
                !0
        },
        slideToLoop: function (e, t, s, i) {
            if (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                "string" == typeof e) {
                e = parseInt(e, 10)
            }
            const r = this
                , a = r.grid && r.params.grid && r.params.grid.rows > 1;
            let n = e;
            if (r.params.loop)
                if (r.virtual && r.params.virtual.enabled)
                    n += r.virtual.slidesBefore;
                else {
                    let e;
                    if (a) {
                        const t = n * r.params.grid.rows;
                        e = r.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === t))[0].column
                    } else
                        e = r.getSlideIndexByData(n);
                    const t = a ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length
                        , { centeredSlides: s } = r.params;
                    let i = r.params.slidesPerView;
                    "auto" === i ? i = r.slidesPerViewDynamic() : (i = Math.ceil(parseFloat(r.params.slidesPerView, 10)),
                        s && i % 2 == 0 && (i += 1));
                    let l = t - e < i;
                    if (s && (l = l || e < Math.ceil(i / 2)),
                        l) {
                        const i = s ? e < r.activeIndex ? "prev" : "next" : e - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
                        r.loopFix({
                            direction: i,
                            slideTo: !0,
                            activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                            slideRealIndex: "next" === i ? r.realIndex : void 0
                        })
                    }
                    if (a) {
                        const e = n * r.params.grid.rows;
                        n = r.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0].column
                    } else
                        n = r.getSlideIndexByData(n)
                }
            return requestAnimationFrame((() => {
                r.slideTo(n, t, s, i)
            }
            )),
                r
        },
        slideNext: function (e, t, s) {
            void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
            const i = this
                , { enabled: r, params: a, animating: n } = i;
            if (!r)
                return i;
            let l = a.slidesPerGroup;
            "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const o = i.activeIndex < a.slidesPerGroupSkip ? 1 : l
                , d = i.virtual && a.virtual.enabled;
            if (a.loop) {
                if (n && !d && a.loopPreventsSliding)
                    return !1;
                if (i.loopFix({
                    direction: "next"
                }),
                    i._clientLeft = i.wrapperEl.clientLeft,
                    i.activeIndex === i.slides.length - 1 && a.cssMode)
                    return requestAnimationFrame((() => {
                        i.slideTo(i.activeIndex + o, e, t, s)
                    }
                    )),
                        !0
            }
            return a.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + o, e, t, s)
        },
        slidePrev: function (e, t, s) {
            void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
            const i = this
                , { params: r, snapGrid: a, slidesGrid: n, rtlTranslate: l, enabled: o, animating: d } = i;
            if (!o)
                return i;
            const c = i.virtual && r.virtual.enabled;
            if (r.loop) {
                if (d && !c && r.loopPreventsSliding)
                    return !1;
                i.loopFix({
                    direction: "prev"
                }),
                    i._clientLeft = i.wrapperEl.clientLeft
            }
            function p(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const u = p(l ? i.translate : -i.translate)
                , m = a.map((e => p(e)));
            let h = a[m.indexOf(u) - 1];
            if (void 0 === h && r.cssMode) {
                let e;
                a.forEach(((t, s) => {
                    u >= t && (e = s)
                }
                )),
                    void 0 !== e && (h = a[e > 0 ? e - 1 : e])
            }
            let f = 0;
            if (void 0 !== h && (f = n.indexOf(h),
                f < 0 && (f = i.activeIndex - 1),
                "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (f = f - i.slidesPerViewDynamic("previous", !0) + 1,
                    f = Math.max(f, 0))),
                r.rewind && i.isBeginning) {
                const r = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                return i.slideTo(r, e, t, s)
            }
            return r.loop && 0 === i.activeIndex && r.cssMode ? (requestAnimationFrame((() => {
                i.slideTo(f, e, t, s)
            }
            )),
                !0) : i.slideTo(f, e, t, s)
        },
        slideReset: function (e, t, s) {
            return void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, s)
        },
        slideToClosest: function (e, t, s, i) {
            void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === i && (i = .5);
            const r = this;
            let a = r.activeIndex;
            const n = Math.min(r.params.slidesPerGroupSkip, a)
                , l = n + Math.floor((a - n) / r.params.slidesPerGroup)
                , o = r.rtlTranslate ? r.translate : -r.translate;
            if (o >= r.snapGrid[l]) {
                const e = r.snapGrid[l];
                o - e > (r.snapGrid[l + 1] - e) * i && (a += r.params.slidesPerGroup)
            } else {
                const e = r.snapGrid[l - 1];
                o - e <= (r.snapGrid[l] - e) * i && (a -= r.params.slidesPerGroup)
            }
            return a = Math.max(a, 0),
                a = Math.min(a, r.slidesGrid.length - 1),
                r.slideTo(a, e, t, s)
        },
        slideToClickedSlide: function () {
            const e = this
                , { params: t, slidesEl: s } = e
                , i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let r, a = e.clickedIndex;
            const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
            if (t.loop) {
                if (e.animating)
                    return;
                r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
                    t.centeredSlides ? a < e.loopedSlides - i / 2 || a > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(),
                        a = e.getSlideIndex(x(s, `${n}[data-swiper-slide-index="${r}"]`)[0]),
                        f((() => {
                            e.slideTo(a)
                        }
                        ))) : e.slideTo(a) : a > e.slides.length - i ? (e.loopFix(),
                            a = e.getSlideIndex(x(s, `${n}[data-swiper-slide-index="${r}"]`)[0]),
                            f((() => {
                                e.slideTo(a)
                            }
                            ))) : e.slideTo(a)
            } else
                e.slideTo(a)
        }
    },
    loop: {
        loopCreate: function (e) {
            const t = this
                , { params: s, slidesEl: i } = t;
            if (!s.loop || t.virtual && t.params.virtual.enabled)
                return;
            const r = () => {
                x(i, `.${s.slideClass}, swiper-slide`).forEach(((e, t) => {
                    e.setAttribute("data-swiper-slide-index", t)
                }
                ))
            }
                , a = t.grid && s.grid && s.grid.rows > 1
                , n = s.slidesPerGroup * (a ? s.grid.rows : 1)
                , l = t.slides.length % n != 0
                , o = a && t.slides.length % s.grid.rows != 0
                , d = e => {
                    for (let i = 0; i < e; i += 1) {
                        const e = t.isElement ? C("swiper-slide", [s.slideBlankClass]) : C("div", [s.slideClass, s.slideBlankClass]);
                        t.slidesEl.append(e)
                    }
                }
                ;
            if (l) {
                if (s.loopAddBlankSlides) {
                    d(n - t.slides.length % n),
                        t.recalcSlides(),
                        t.updateSlides()
                } else
                    E("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                r()
            } else if (o) {
                if (s.loopAddBlankSlides) {
                    d(s.grid.rows - t.slides.length % s.grid.rows),
                        t.recalcSlides(),
                        t.updateSlides()
                } else
                    E("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                r()
            } else
                r();
            t.loopFix({
                slideRealIndex: e,
                direction: s.centeredSlides ? void 0 : "next"
            })
        },
        loopFix: function (e) {
            let { slideRealIndex: t, slideTo: s = !0, direction: i, setTranslate: r, activeSlideIndex: a, byController: n, byMousewheel: d } = void 0 === e ? {} : e;
            const c = this;
            if (!c.params.loop)
                return;
            c.emit("beforeLoopFix");
            const { slides: p, allowSlidePrev: u, allowSlideNext: m, slidesEl: h, params: f } = c
                , { centeredSlides: g } = f;
            if (c.allowSlidePrev = !0,
                c.allowSlideNext = !0,
                c.virtual && f.virtual.enabled)
                return s && (f.centeredSlides || 0 !== c.snapIndex ? f.centeredSlides && c.snapIndex < f.slidesPerView ? c.slideTo(c.virtual.slides.length + c.snapIndex, 0, !1, !0) : c.snapIndex === c.snapGrid.length - 1 && c.slideTo(c.virtual.slidesBefore, 0, !1, !0) : c.slideTo(c.virtual.slides.length, 0, !1, !0)),
                    c.allowSlidePrev = u,
                    c.allowSlideNext = m,
                    void c.emit("loopFix");
            let v = f.slidesPerView;
            "auto" === v ? v = c.slidesPerViewDynamic() : (v = Math.ceil(parseFloat(f.slidesPerView, 10)),
                g && v % 2 == 0 && (v += 1));
            const w = f.slidesPerGroupAuto ? v : f.slidesPerGroup;
            let b = w;
            b % w != 0 && (b += w - b % w),
                b += f.loopAdditionalSlides,
                c.loopedSlides = b;
            const S = c.grid && f.grid && f.grid.rows > 1;
            p.length < v + b ? E("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : S && "row" === f.grid.fill && E("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
            const T = []
                , y = [];
            let x = c.activeIndex;
            void 0 === a ? a = c.getSlideIndex(p.filter((e => e.classList.contains(f.slideActiveClass)))[0]) : x = a;
            const C = "next" === i || !i
                , M = "prev" === i || !i;
            let P = 0
                , L = 0;
            const k = S ? Math.ceil(p.length / f.grid.rows) : p.length
                , I = (S ? p[a].column : a) + (g && void 0 === r ? -v / 2 + .5 : 0);
            if (I < b) {
                P = Math.max(b - I, w);
                for (let e = 0; e < b - I; e += 1) {
                    const t = e - Math.floor(e / k) * k;
                    if (S) {
                        const e = k - t - 1;
                        for (let t = p.length - 1; t >= 0; t -= 1)
                            p[t].column === e && T.push(t)
                    } else
                        T.push(k - t - 1)
                }
            } else if (I + v > k - b) {
                L = Math.max(I - (k - 2 * b), w);
                for (let e = 0; e < L; e += 1) {
                    const t = e - Math.floor(e / k) * k;
                    S ? p.forEach(((e, s) => {
                        e.column === t && y.push(s)
                    }
                    )) : y.push(t)
                }
            }
            if (M && T.forEach((e => {
                p[e].swiperLoopMoveDOM = !0,
                    h.prepend(p[e]),
                    p[e].swiperLoopMoveDOM = !1
            }
            )),
                C && y.forEach((e => {
                    p[e].swiperLoopMoveDOM = !0,
                        h.append(p[e]),
                        p[e].swiperLoopMoveDOM = !1
                }
                )),
                c.recalcSlides(),
                "auto" === f.slidesPerView ? c.updateSlides() : S && (T.length > 0 && M || y.length > 0 && C) && c.slides.forEach(((e, t) => {
                    c.grid.updateSlide(t, e, c.slides)
                }
                )),
                f.watchSlidesProgress && c.updateSlidesOffset(),
                s)
                if (T.length > 0 && M) {
                    if (void 0 === t) {
                        const e = c.slidesGrid[x]
                            , t = c.slidesGrid[x + P] - e;
                        d ? c.setTranslate(c.translate - t) : (c.slideTo(x + P, 0, !1, !0),
                            r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t,
                                c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t))
                    } else if (r) {
                        const e = S ? T.length / f.grid.rows : T.length;
                        c.slideTo(c.activeIndex + e, 0, !1, !0),
                            c.touchEventsData.currentTranslate = c.translate
                    }
                } else if (y.length > 0 && C)
                    if (void 0 === t) {
                        const e = c.slidesGrid[x]
                            , t = c.slidesGrid[x - L] - e;
                        d ? c.setTranslate(c.translate - t) : (c.slideTo(x - L, 0, !1, !0),
                            r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t,
                                c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t))
                    } else {
                        const e = S ? y.length / f.grid.rows : y.length;
                        c.slideTo(c.activeIndex - e, 0, !1, !0)
                    }
            if (c.allowSlidePrev = u,
                c.allowSlideNext = m,
                c.controller && c.controller.control && !n) {
                const e = {
                    slideRealIndex: t,
                    direction: i,
                    setTranslate: r,
                    activeSlideIndex: a,
                    byController: !0
                };
                Array.isArray(c.controller.control) ? c.controller.control.forEach((t => {
                    !t.destroyed && t.params.loop && t.loopFix(o(l({}, e), {
                        slideTo: t.params.slidesPerView === f.slidesPerView && s
                    }))
                }
                )) : c.controller.control instanceof c.constructor && c.controller.control.params.loop && c.controller.control.loopFix(o(l({}, e), {
                    slideTo: c.controller.control.params.slidesPerView === f.slidesPerView && s
                }))
            }
            c.emit("loopFix")
        },
        loopDestroy: function () {
            const e = this
                , { params: t, slidesEl: s } = e;
            if (!t.loop || e.virtual && e.params.virtual.enabled)
                return;
            e.recalcSlides();
            const i = [];
            e.slides.forEach((e => {
                const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                i[t] = e
            }
            )),
                e.slides.forEach((e => {
                    e.removeAttribute("data-swiper-slide-index")
                }
                )),
                i.forEach((e => {
                    s.append(e)
                }
                )),
                e.recalcSlides(),
                e.slideTo(e.realIndex, 0)
        }
    },
    grabCursor: {
        setGrabCursor: function (e) {
            const t = this;
            if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                return;
            const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
                s.style.cursor = "move",
                s.style.cursor = e ? "grabbing" : "grab",
                t.isElement && requestAnimationFrame((() => {
                    t.__preventObserver__ = !1
                }
                ))
        },
        unsetGrabCursor: function () {
            const e = this;
            e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
                e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
                e.isElement && requestAnimationFrame((() => {
                    e.__preventObserver__ = !1
                }
                )))
        }
    },
    events: {
        attachEvents: function () {
            const e = this
                , { params: t } = e;
            e.onTouchStart = N.bind(e),
                e.onTouchMove = H.bind(e),
                e.onTouchEnd = j.bind(e),
                e.onDocumentTouchStart = X.bind(e),
                t.cssMode && (e.onScroll = W.bind(e)),
                e.onClick = q.bind(e),
                e.onLoad = Y.bind(e),
                U(e, "on")
        },
        detachEvents: function () {
            U(this, "off")
        }
    },
    breakpoints: {
        setBreakpoint: function () {
            const e = this
                , { realIndex: t, initialized: s, params: i, el: r } = e
                , a = i.breakpoints;
            if (!a || a && 0 === Object.keys(a).length)
                return;
            const n = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
            if (!n || e.currentBreakpoint === n)
                return;
            const l = (n in a ? a[n] : void 0) || e.originalParams
                , o = K(e, i)
                , d = K(e, l)
                , c = i.enabled;
            o && !d ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()) : !o && d && (r.classList.add(`${i.containerModifierClass}grid`),
                    (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === i.grid.fill) && r.classList.add(`${i.containerModifierClass}grid-column`),
                    e.emitContainerClasses()),
                ["navigation", "pagination", "scrollbar"].forEach((t => {
                    if (void 0 === l[t])
                        return;
                    const s = i[t] && i[t].enabled
                        , r = l[t] && l[t].enabled;
                    s && !r && e[t].disable(),
                        !s && r && e[t].enable()
                }
                ));
            const p = l.direction && l.direction !== i.direction
                , u = i.loop && (l.slidesPerView !== i.slidesPerView || p)
                , m = i.loop;
            p && s && e.changeDirection(),
                S(e.params, l);
            const h = e.params.enabled
                , f = e.params.loop;
            Object.assign(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev
            }),
                c && !h ? e.disable() : !c && h && e.enable(),
                e.currentBreakpoint = n,
                e.emit("_beforeBreakpoint", l),
                s && (u ? (e.loopDestroy(),
                    e.loopCreate(t),
                    e.updateSlides()) : !m && f ? (e.loopCreate(t),
                        e.updateSlides()) : m && !f && e.loopDestroy()),
                e.emit("breakpoint", l)
        },
        getBreakpoint: function (e, t, s) {
            if (void 0 === t && (t = "window"),
                !e || "container" === t && !s)
                return;
            let i = !1;
            const r = h()
                , a = "window" === t ? r.innerHeight : s.clientHeight
                , n = Object.keys(e).map((e => {
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                        const t = parseFloat(e.substr(1));
                        return {
                            value: a * t,
                            point: e
                        }
                    }
                    return {
                        value: e,
                        point: e
                    }
                }
                ));
            n.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
            for (let l = 0; l < n.length; l += 1) {
                const { point: e, value: a } = n[l];
                "window" === t ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = e) : a <= s.clientWidth && (i = e)
            }
            return i || "max"
        }
    },
    checkOverflow: {
        checkOverflow: function () {
            const e = this
                , { isLocked: t, params: s } = e
                , { slidesOffsetBefore: i } = s;
            if (i) {
                const t = e.slides.length - 1
                    , s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                e.isLocked = e.size > s
            } else
                e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
        }
    },
    classes: {
        addClasses: function () {
            const e = this
                , { classNames: t, params: s, rtl: i, el: r, device: a } = e
                , n = function (e, t) {
                    const s = [];
                    return e.forEach((e => {
                        "object" == typeof e ? Object.keys(e).forEach((i => {
                            e[i] && s.push(t + i)
                        }
                        )) : "string" == typeof e && s.push(t + e)
                    }
                    )),
                        s
                }(["initialized", s.direction, {
                    "free-mode": e.params.freeMode && s.freeMode.enabled
                }, {
                        autoheight: s.autoHeight
                    }, {
                        rtl: i
                    }, {
                        grid: s.grid && s.grid.rows > 1
                    }, {
                        "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                    }, {
                        android: a.android
                    }, {
                        ios: a.ios
                    }, {
                        "css-mode": s.cssMode
                    }, {
                        centered: s.cssMode && s.centeredSlides
                    }, {
                        "watch-progress": s.watchSlidesProgress
                    }], s.containerModifierClass);
            t.push(...n),
                r.classList.add(...t),
                e.emitContainerClasses()
        },
        removeClasses: function () {
            const { el: e, classNames: t } = this;
            e.classList.remove(...t),
                this.emitContainerClasses()
        }
    }
}
    , ee = {};
class te {
    constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
            i[r] = arguments[r];
        1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i,
            t || (t = {}),
            t = S({}, t),
            e && !t.el && (t.el = e);
        const a = u();
        if (t.el && "string" == typeof t.el && a.querySelectorAll(t.el).length > 1) {
            const e = [];
            return a.querySelectorAll(t.el).forEach((s => {
                const i = S({}, t, {
                    el: s
                });
                e.push(new te(i))
            }
            )),
                e
        }
        const n = this;
        n.__swiper__ = !0,
            n.support = z(),
            n.device = G({
                userAgent: t.userAgent
            }),
            n.browser = D(),
            n.eventsListeners = {},
            n.eventsAnyListeners = [],
            n.modules = [...n.__modules__],
            t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
        const l = {};
        n.modules.forEach((e => {
            e({
                params: t,
                swiper: n,
                extendParams: Q(t, l),
                on: n.on.bind(n),
                once: n.once.bind(n),
                off: n.off.bind(n),
                emit: n.emit.bind(n)
            })
        }
        ));
        const o = S({}, J, l);
        return n.params = S({}, o, ee, t),
            n.originalParams = S({}, n.params),
            n.passedParams = S({}, t),
            n.params && n.params.on && Object.keys(n.params.on).forEach((e => {
                n.on(e, n.params.on[e])
            }
            )),
            n.params && n.params.onAny && n.onAny(n.params.onAny),
            Object.assign(n, {
                enabled: n.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === n.params.direction,
                isVertical: () => "vertical" === n.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: n.params.allowSlideNext,
                allowSlidePrev: n.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: n.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: !0,
                allowTouchMove: n.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            n.emit("_swiper"),
            n.params.init && n.init(),
            n
    }
    getDirectionLabel(e) {
        return this.isHorizontal() ? e : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[e]
    }
    getSlideIndex(e) {
        const { slidesEl: t, params: s } = this
            , i = P(x(t, `.${s.slideClass}, swiper-slide`)[0]);
        return P(e) - i
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0])
    }
    recalcSlides() {
        const { slidesEl: e, params: t } = this;
        this.slides = x(e, `.${t.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
    }
    setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate()
            , r = (s.maxTranslate() - i) * e + i;
        s.translateTo(r, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = [];
        e.slides.forEach((s => {
            const i = e.getSlideClasses(s);
            t.push({
                slideEl: s,
                classNames: i
            }),
                e.emit("_slideClass", s, i)
        }
        )),
            e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"),
            void 0 === t && (t = !1);
        const { params: s, slides: i, slidesGrid: r, slidesSizesGrid: a, size: n, activeIndex: l } = this;
        let o = 1;
        if ("number" == typeof s.slidesPerView)
            return s.slidesPerView;
        if (s.centeredSlides) {
            let e, t = i[l] ? i[l].swiperSlideSize : 0;
            for (let s = l + 1; s < i.length; s += 1)
                i[s] && !e && (t += i[s].swiperSlideSize,
                    o += 1,
                    t > n && (e = !0));
            for (let s = l - 1; s >= 0; s -= 1)
                i[s] && !e && (t += i[s].swiperSlideSize,
                    o += 1,
                    t > n && (e = !0))
        } else if ("current" === e)
            for (let d = l + 1; d < i.length; d += 1) {
                (t ? r[d] + a[d] - r[l] < n : r[d] - r[l] < n) && (o += 1)
            }
        else
            for (let d = l - 1; d >= 0; d -= 1) {
                r[l] - r[d] < n && (o += 1)
            }
        return o
    }
    update() {
        const e = this;
        if (!e || e.destroyed)
            return;
        const { snapGrid: t, params: s } = e;
        function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate
                , s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
        }
        let r;
        if (s.breakpoints && e.setBreakpoint(),
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => {
                t.complete && $(e, t)
            }
            )),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            s.freeMode && s.freeMode.enabled && !s.cssMode)
            i(),
                s.autoHeight && e.updateAutoHeight();
        else {
            if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                r = e.slideTo(t.length - 1, 0, !1, !0)
            } else
                r = e.slideTo(e.activeIndex, 0, !1, !0);
            r || i()
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
    }
    changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this
            , i = s.params.direction;
        return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
                s.el.classList.add(`${s.params.containerModifierClass}${e}`),
                s.emitContainerClasses(),
                s.params.direction = e,
                s.slides.forEach((t => {
                    "vertical" === e ? t.style.width = "" : t.style.height = ""
                }
                )),
                s.emit("changeDirection"),
                t && s.update()),
            s
    }
    changeLanguageDirection(e) {
        const t = this;
        t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
            t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
            t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
                t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
                    t.el.dir = "ltr"),
            t.update())
    }
    mount(e) {
        const t = this;
        if (t.mounted)
            return !0;
        let s = e || t.params.el;
        if ("string" == typeof s && (s = document.querySelector(s)),
            !s)
            return !1;
        s.swiper = t,
            s.parentNode && s.parentNode.host && "SWIPER-CONTAINER" === s.parentNode.host.nodeName && (t.isElement = !0);
        const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let r = (() => {
            if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                return s.shadowRoot.querySelector(i())
            }
            return x(s, i())[0]
        }
        )();
        return !r && t.params.createElements && (r = C("div", t.params.wrapperClass),
            s.append(r),
            x(s, `.${t.params.slideClass}`).forEach((e => {
                r.append(e)
            }
            ))),
            Object.assign(t, {
                el: s,
                wrapperEl: r,
                slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : r,
                hostEl: t.isElement ? s.parentNode.host : s,
                mounted: !0,
                rtl: "rtl" === s.dir.toLowerCase() || "rtl" === M(s, "direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === M(s, "direction")),
                wrongRTL: "-webkit-box" === M(r, "display")
            }),
            !0
    }
    init(e) {
        const t = this;
        if (t.initialized)
            return t;
        if (!1 === t.mount(e))
            return t;
        t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.params.loop && t.loopCreate(),
            t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
            s.forEach((e => {
                e.complete ? $(t, e) : e.addEventListener("load", (e => {
                    $(t, e.target)
                }
                ))
            }
            )),
            B(t),
            t.initialized = !0,
            B(t),
            t.emit("init"),
            t.emit("afterInit"),
            t
    }
    destroy(e, t) {
        void 0 === e && (e = !0),
            void 0 === t && (t = !0);
        const s = this
            , { params: i, el: r, wrapperEl: a, slides: n } = s;
        return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
            s.initialized = !1,
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t && (s.removeClasses(),
                r.removeAttribute("style"),
                a.removeAttribute("style"),
                n && n.length && n.forEach((e => {
                    e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass),
                        e.removeAttribute("style"),
                        e.removeAttribute("data-swiper-slide-index")
                }
                ))),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e => {
                s.off(e)
            }
            )),
            !1 !== e && (s.el.swiper = null,
                function (e) {
                    const t = e;
                    Object.keys(t).forEach((e => {
                        try {
                            t[e] = null
                        } catch (s) { }
                        try {
                            delete t[e]
                        } catch (s) { }
                    }
                    ))
                }(s)),
            s.destroyed = !0),
            null
    }
    static extendDefaults(e) {
        S(ee, e)
    }
    static get extendedDefaults() {
        return ee
    }
    static get defaults() {
        return J
    }
    static installModule(e) {
        te.prototype.__modules__ || (te.prototype.__modules__ = []);
        const t = te.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach((e => te.installModule(e))),
            te) : (te.installModule(e),
                te)
    }
}
function se(e, t, s, i) {
    return e.params.createElements && Object.keys(i).forEach((r => {
        if (!s[r] && !0 === s.auto) {
            let a = x(e.el, `.${i[r]}`)[0];
            a || (a = C("div", i[r]),
                a.className = i[r],
                e.el.append(a)),
                s[r] = a,
                t[r] = a
        }
    }
    )),
        s
}
function ie(e) {
    let { swiper: t, extendParams: s, on: i, emit: r } = e;
    s({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }),
        t.navigation = {
            nextEl: null,
            prevEl: null
        };
    const a = e => (Array.isArray(e) ? e : [e]).filter((e => !!e));
    function n(e) {
        let s;
        return e && "string" == typeof e && t.isElement && (s = t.el.querySelector(e),
            s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
                t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))),
                e && !s ? e : s)
    }
    function l(e, s) {
        const i = t.params.navigation;
        (e = a(e)).forEach((e => {
            e && (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
                "BUTTON" === e.tagName && (e.disabled = s),
                t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](i.lockClass))
        }
        ))
    }
    function o() {
        const { nextEl: e, prevEl: s } = t.navigation;
        if (t.params.loop)
            return l(s, !1),
                void l(e, !1);
        l(s, t.isBeginning && !t.params.rewind),
            l(e, t.isEnd && !t.params.rewind)
    }
    function d(e) {
        e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(),
                r("navigationPrev"))
    }
    function c(e) {
        e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(),
                r("navigationNext"))
    }
    function p() {
        const e = t.params.navigation;
        if (t.params.navigation = se(t, t.originalParams.navigation, t.params.navigation, {
            nextEl: "swiper-button-next",
            prevEl: "swiper-button-prev"
        }),
            !e.nextEl && !e.prevEl)
            return;
        let s = n(e.nextEl)
            , i = n(e.prevEl);
        Object.assign(t.navigation, {
            nextEl: s,
            prevEl: i
        }),
            s = a(s),
            i = a(i);
        const r = (s, i) => {
            s && s.addEventListener("click", "next" === i ? c : d),
                !t.enabled && s && s.classList.add(...e.lockClass.split(" "))
        }
            ;
        s.forEach((e => r(e, "next"))),
            i.forEach((e => r(e, "prev")))
    }
    function u() {
        let { nextEl: e, prevEl: s } = t.navigation;
        e = a(e),
            s = a(s);
        const i = (e, s) => {
            e.removeEventListener("click", "next" === s ? c : d),
                e.classList.remove(...t.params.navigation.disabledClass.split(" "))
        }
            ;
        e.forEach((e => i(e, "next"))),
            s.forEach((e => i(e, "prev")))
    }
    i("init", (() => {
        !1 === t.params.navigation.enabled ? m() : (p(),
            o())
    }
    )),
        i("toEdge fromEdge lock unlock", (() => {
            o()
        }
        )),
        i("destroy", (() => {
            u()
        }
        )),
        i("enable disable", (() => {
            let { nextEl: e, prevEl: s } = t.navigation;
            e = a(e),
                s = a(s),
                t.enabled ? o() : [...e, ...s].filter((e => !!e)).forEach((e => e.classList.add(t.params.navigation.lockClass)))
        }
        )),
        i("click", ((e, s) => {
            let { nextEl: i, prevEl: n } = t.navigation;
            i = a(i),
                n = a(n);
            const l = s.target;
            if (t.params.navigation.hideOnClick && !n.includes(l) && !i.includes(l)) {
                if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === l || t.pagination.el.contains(l)))
                    return;
                let e;
                i.length ? e = i[0].classList.contains(t.params.navigation.hiddenClass) : n.length && (e = n[0].classList.contains(t.params.navigation.hiddenClass)),
                    r(!0 === e ? "navigationShow" : "navigationHide"),
                    [...i, ...n].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass)))
            }
        }
        ));
    const m = () => {
        t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),
            u()
    }
        ;
    Object.assign(t.navigation, {
        enable: () => {
            t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),
                p(),
                o()
        }
        ,
        disable: m,
        update: o,
        init: p,
        destroy: u
    })
}
function re(e) {
    return void 0 === e && (e = ""),
        `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`
}
function ae(e) {
    let { swiper: t, extendParams: s, on: i, emit: r } = e;
    const a = "swiper-pagination";
    let n;
    s({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: e => e,
            formatFractionTotal: e => e,
            bulletClass: `${a}-bullet`,
            bulletActiveClass: `${a}-bullet-active`,
            modifierClass: `${a}-`,
            currentClass: `${a}-current`,
            totalClass: `${a}-total`,
            hiddenClass: `${a}-hidden`,
            progressbarFillClass: `${a}-progressbar-fill`,
            progressbarOppositeClass: `${a}-progressbar-opposite`,
            clickableClass: `${a}-clickable`,
            lockClass: `${a}-lock`,
            horizontalClass: `${a}-horizontal`,
            verticalClass: `${a}-vertical`,
            paginationDisabledClass: `${a}-disabled`
        }
    }),
        t.pagination = {
            el: null,
            bullets: []
        };
    let l = 0;
    const o = e => (Array.isArray(e) ? e : [e]).filter((e => !!e));
    function d() {
        return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length
    }
    function c(e, s) {
        const { bulletActiveClass: i } = t.params.pagination;
        e && (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${i}-${s}`),
            (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${i}-${s}-${s}`))
    }
    function p(e) {
        const s = e.target.closest(re(t.params.pagination.bulletClass));
        if (!s)
            return;
        e.preventDefault();
        const i = P(s) * t.params.slidesPerGroup;
        if (t.params.loop) {
            if (t.realIndex === i)
                return;
            t.slideToLoop(i)
        } else
            t.slideTo(i)
    }
    function u() {
        const e = t.rtl
            , s = t.params.pagination;
        if (d())
            return;
        let i, a, p = t.pagination.el;
        p = o(p);
        const u = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length
            , m = t.params.loop ? Math.ceil(u / t.params.slidesPerGroup) : t.snapGrid.length;
        if (t.params.loop ? (a = t.previousRealIndex || 0,
            i = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (i = t.snapIndex,
                a = t.previousSnapIndex) : (a = t.previousIndex || 0,
                    i = t.activeIndex || 0),
            "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
            const r = t.pagination.bullets;
            let o, d, u;
            if (s.dynamicBullets && (n = k(r[0], t.isHorizontal() ? "width" : "height", !0),
                p.forEach((e => {
                    e.style[t.isHorizontal() ? "width" : "height"] = n * (s.dynamicMainBullets + 4) + "px"
                }
                )),
                s.dynamicMainBullets > 1 && void 0 !== a && (l += i - (a || 0),
                    l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)),
                o = Math.max(i - l, 0),
                d = o + (Math.min(r.length, s.dynamicMainBullets) - 1),
                u = (d + o) / 2),
                r.forEach((e => {
                    const t = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e => `${s.bulletActiveClass}${e}`))].map((e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat();
                    e.classList.remove(...t)
                }
                )),
                p.length > 1)
                r.forEach((e => {
                    const r = P(e);
                    r === i ? e.classList.add(...s.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"),
                        s.dynamicBullets && (r >= o && r <= d && e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                            r === o && c(e, "prev"),
                            r === d && c(e, "next"))
                }
                ));
            else {
                const e = r[i];
                if (e && e.classList.add(...s.bulletActiveClass.split(" ")),
                    t.isElement && r.forEach(((e, t) => {
                        e.setAttribute("part", t === i ? "bullet-active" : "bullet")
                    }
                    )),
                    s.dynamicBullets) {
                    const e = r[o]
                        , t = r[d];
                    for (let i = o; i <= d; i += 1)
                        r[i] && r[i].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
                    c(e, "prev"),
                        c(t, "next")
                }
            }
            if (s.dynamicBullets) {
                const i = Math.min(r.length, s.dynamicMainBullets + 4)
                    , a = (n * i - n) / 2 - u * n
                    , l = e ? "right" : "left";
                r.forEach((e => {
                    e.style[t.isHorizontal() ? l : "top"] = `${a}px`
                }
                ))
            }
        }
        p.forEach(((e, a) => {
            if ("fraction" === s.type && (e.querySelectorAll(re(s.currentClass)).forEach((e => {
                e.textContent = s.formatFractionCurrent(i + 1)
            }
            )),
                e.querySelectorAll(re(s.totalClass)).forEach((e => {
                    e.textContent = s.formatFractionTotal(m)
                }
                ))),
                "progressbar" === s.type) {
                let r;
                r = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                const a = (i + 1) / m;
                let n = 1
                    , l = 1;
                "horizontal" === r ? n = a : l = a,
                    e.querySelectorAll(re(s.progressbarFillClass)).forEach((e => {
                        e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`,
                            e.style.transitionDuration = `${t.params.speed}ms`
                    }
                    ))
            }
            "custom" === s.type && s.renderCustom ? (e.innerHTML = s.renderCustom(t, i + 1, m),
                0 === a && r("paginationRender", e)) : (0 === a && r("paginationRender", e),
                    r("paginationUpdate", e)),
                t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](s.lockClass)
        }
        ))
    }
    function m() {
        const e = t.params.pagination;
        if (d())
            return;
        const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.grid && t.params.grid.rows > 1 ? t.slides.length / Math.ceil(t.params.grid.rows) : t.slides.length;
        let i = t.pagination.el;
        i = o(i);
        let a = "";
        if ("bullets" === e.type) {
            let i = t.params.loop ? Math.ceil(s / t.params.slidesPerGroup) : t.snapGrid.length;
            t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
            for (let s = 0; s < i; s += 1)
                e.renderBullet ? a += e.renderBullet.call(t, s, e.bulletClass) : a += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`
        }
        "fraction" === e.type && (a = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
            "progressbar" === e.type && (a = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`),
            t.pagination.bullets = [],
            i.forEach((s => {
                "custom" !== e.type && (s.innerHTML = a || ""),
                    "bullets" === e.type && t.pagination.bullets.push(...s.querySelectorAll(re(e.bulletClass)))
            }
            )),
            "custom" !== e.type && r("paginationRender", i[0])
    }
    function h() {
        t.params.pagination = se(t, t.originalParams.pagination, t.params.pagination, {
            el: "swiper-pagination"
        });
        const e = t.params.pagination;
        if (!e.el)
            return;
        let s;
        "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
            s || "string" != typeof e.el || (s = [...document.querySelectorAll(e.el)]),
            s || (s = e.el),
            s && 0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(s) && s.length > 1 && (s = [...t.el.querySelectorAll(e.el)],
                s.length > 1 && (s = s.filter((e => L(e, ".swiper")[0] === t.el))[0])),
                Array.isArray(s) && 1 === s.length && (s = s[0]),
                Object.assign(t.pagination, {
                    el: s
                }),
                s = o(s),
                s.forEach((s => {
                    "bullets" === e.type && e.clickable && s.classList.add(...(e.clickableClass || "").split(" ")),
                        s.classList.add(e.modifierClass + e.type),
                        s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                        "bullets" === e.type && e.dynamicBullets && (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                            l = 0,
                            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                        "progressbar" === e.type && e.progressbarOpposite && s.classList.add(e.progressbarOppositeClass),
                        e.clickable && s.addEventListener("click", p),
                        t.enabled || s.classList.add(e.lockClass)
                }
                )))
    }
    function f() {
        const e = t.params.pagination;
        if (d())
            return;
        let s = t.pagination.el;
        s && (s = o(s),
            s.forEach((s => {
                s.classList.remove(e.hiddenClass),
                    s.classList.remove(e.modifierClass + e.type),
                    s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                    e.clickable && (s.classList.remove(...(e.clickableClass || "").split(" ")),
                        s.removeEventListener("click", p))
            }
            ))),
            t.pagination.bullets && t.pagination.bullets.forEach((t => t.classList.remove(...e.bulletActiveClass.split(" "))))
    }
    i("changeDirection", (() => {
        if (!t.pagination || !t.pagination.el)
            return;
        const e = t.params.pagination;
        let { el: s } = t.pagination;
        s = o(s),
            s.forEach((s => {
                s.classList.remove(e.horizontalClass, e.verticalClass),
                    s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass)
            }
            ))
    }
    )),
        i("init", (() => {
            !1 === t.params.pagination.enabled ? g() : (h(),
                m(),
                u())
        }
        )),
        i("activeIndexChange", (() => {
            void 0 === t.snapIndex && u()
        }
        )),
        i("snapIndexChange", (() => {
            u()
        }
        )),
        i("snapGridLengthChange", (() => {
            m(),
                u()
        }
        )),
        i("destroy", (() => {
            f()
        }
        )),
        i("enable disable", (() => {
            let { el: e } = t.pagination;
            e && (e = o(e),
                e.forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass))))
        }
        )),
        i("lock unlock", (() => {
            u()
        }
        )),
        i("click", ((e, s) => {
            const i = s.target
                , a = o(t.pagination.el);
            if (t.params.pagination.el && t.params.pagination.hideOnClick && a && a.length > 0 && !i.classList.contains(t.params.pagination.bulletClass)) {
                if (t.navigation && (t.navigation.nextEl && i === t.navigation.nextEl || t.navigation.prevEl && i === t.navigation.prevEl))
                    return;
                const e = a[0].classList.contains(t.params.pagination.hiddenClass);
                r(!0 === e ? "paginationShow" : "paginationHide"),
                    a.forEach((e => e.classList.toggle(t.params.pagination.hiddenClass)))
            }
        }
        ));
    const g = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e && (e = o(e),
            e.forEach((e => e.classList.add(t.params.pagination.paginationDisabledClass)))),
            f()
    }
        ;
    Object.assign(t.pagination, {
        enable: () => {
            t.el.classList.remove(t.params.pagination.paginationDisabledClass);
            let { el: e } = t.pagination;
            e && (e = o(e),
                e.forEach((e => e.classList.remove(t.params.pagination.paginationDisabledClass)))),
                h(),
                m(),
                u()
        }
        ,
        disable: g,
        render: m,
        update: u,
        init: h,
        destroy: f
    })
}
function ne(e) {
    let { swiper: t, extendParams: s, on: i } = e;
    s({
        parallax: {
            enabled: !1
        }
    });
    const r = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
        , a = (e, s) => {
            const { rtl: i } = t
                , r = i ? -1 : 1
                , a = e.getAttribute("data-swiper-parallax") || "0";
            let n = e.getAttribute("data-swiper-parallax-x")
                , l = e.getAttribute("data-swiper-parallax-y");
            const o = e.getAttribute("data-swiper-parallax-scale")
                , d = e.getAttribute("data-swiper-parallax-opacity")
                , c = e.getAttribute("data-swiper-parallax-rotate");
            if (n || l ? (n = n || "0",
                l = l || "0") : t.isHorizontal() ? (n = a,
                    l = "0") : (l = a,
                        n = "0"),
                n = n.indexOf("%") >= 0 ? parseInt(n, 10) * s * r + "%" : n * s * r + "px",
                l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px",
                null != d) {
                const t = d - (d - 1) * (1 - Math.abs(s));
                e.style.opacity = t
            }
            let p = `translate3d(${n}, ${l}, 0px)`;
            if (null != o) {
                p += ` scale(${o - (o - 1) * (1 - Math.abs(s))})`
            }
            if (c && null != c) {
                p += ` rotate(${c * s * -1}deg)`
            }
            e.style.transform = p
        }
        , n = () => {
            const { el: e, slides: s, progress: i, snapGrid: n, isElement: l } = t
                , o = x(e, r);
            t.isElement && o.push(...x(t.hostEl, r)),
                o.forEach((e => {
                    a(e, i)
                }
                )),
                s.forEach(((e, s) => {
                    let l = e.progress;
                    t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (l += Math.ceil(s / 2) - i * (n.length - 1)),
                        l = Math.min(Math.max(l, -1), 1),
                        e.querySelectorAll(`${r}, [data-swiper-parallax-rotate]`).forEach((e => {
                            a(e, l)
                        }
                        ))
                }
                ))
        }
        ;
    i("beforeInit", (() => {
        t.params.parallax.enabled && (t.params.watchSlidesProgress = !0,
            t.originalParams.watchSlidesProgress = !0)
    }
    )),
        i("init", (() => {
            t.params.parallax.enabled && n()
        }
        )),
        i("setTranslate", (() => {
            t.params.parallax.enabled && n()
        }
        )),
        i("setTransition", ((e, s) => {
            t.params.parallax.enabled && function (e) {
                void 0 === e && (e = t.params.speed);
                const { el: s, hostEl: i } = t
                    , a = [...s.querySelectorAll(r)];
                t.isElement && a.push(...i.querySelectorAll(r)),
                    a.forEach((t => {
                        let s = parseInt(t.getAttribute("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (s = 0),
                            t.style.transitionDuration = `${s}ms`
                    }
                    ))
            }(s)
        }
        ))
}
Object.keys(Z).forEach((e => {
    Object.keys(Z[e]).forEach((t => {
        te.prototype[t] = Z[e][t]
    }
    ))
}
)),
    te.use([function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const r = h();
        let a = null
            , n = null;
        const l = () => {
            t && !t.destroyed && t.initialized && (i("beforeResize"),
                i("resize"))
        }
            , o = () => {
                t && !t.destroyed && t.initialized && i("orientationchange")
            }
            ;
        s("init", (() => {
            t.params.resizeObserver && void 0 !== r.ResizeObserver ? t && !t.destroyed && t.initialized && (a = new ResizeObserver((e => {
                n = r.requestAnimationFrame((() => {
                    const { width: s, height: i } = t;
                    let r = s
                        , a = i;
                    e.forEach((e => {
                        let { contentBoxSize: s, contentRect: i, target: n } = e;
                        n && n !== t.el || (r = i ? i.width : (s[0] || s).inlineSize,
                            a = i ? i.height : (s[0] || s).blockSize)
                    }
                    )),
                        r === s && a === i || l()
                }
                ))
            }
            )),
                a.observe(t.el)) : (r.addEventListener("resize", l),
                    r.addEventListener("orientationchange", o))
        }
        )),
            s("destroy", (() => {
                n && r.cancelAnimationFrame(n),
                    a && a.unobserve && t.el && (a.unobserve(t.el),
                        a = null),
                    r.removeEventListener("resize", l),
                    r.removeEventListener("orientationchange", o)
            }
            ))
    }
        , function (e) {
            let { swiper: t, extendParams: s, on: i, emit: r } = e;
            const a = []
                , n = h()
                , l = function (e, s) {
                    void 0 === s && (s = {});
                    const i = new (n.MutationObserver || n.WebkitMutationObserver)((e => {
                        if (t.__preventObserver__)
                            return;
                        if (1 === e.length)
                            return void r("observerUpdate", e[0]);
                        const s = function () {
                            r("observerUpdate", e[0])
                        };
                        n.requestAnimationFrame ? n.requestAnimationFrame(s) : n.setTimeout(s, 0)
                    }
                    ));
                    i.observe(e, {
                        attributes: void 0 === s.attributes || s.attributes,
                        childList: void 0 === s.childList || s.childList,
                        characterData: void 0 === s.characterData || s.characterData
                    }),
                        a.push(i)
                };
            s({
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            }),
                i("init", (() => {
                    if (t.params.observer) {
                        if (t.params.observeParents) {
                            const e = L(t.hostEl);
                            for (let t = 0; t < e.length; t += 1)
                                l(e[t])
                        }
                        l(t.hostEl, {
                            childList: t.params.observeSlideChildren
                        }),
                            l(t.wrapperEl, {
                                attributes: !1
                            })
                    }
                }
                )),
                i("destroy", (() => {
                    a.forEach((e => {
                        e.disconnect()
                    }
                    )),
                        a.splice(0, a.length)
                }
                ))
        }
    ]);
export { ie as N, ae as P, te as S, ne as a };
