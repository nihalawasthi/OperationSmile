import { S as e, N as t, P as s, a as r } from "./vendor.js";
!function () {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
            t(e);
        new MutationObserver((e => {
            for (const s of e)
                if ("childList" === s.type)
                    for (const e of s.addedNodes)
                        "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
        }
        )).observe(document, {
            childList: !0,
            subtree: !0
        })
    }
    function t(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const t = function (e) {
            const t = {};
            return e.integrity && (t.integrity = e.integrity),
                e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
                "use-credentials" === e.crossorigin ? t.credentials = "include" : "anonymous" === e.crossorigin ? t.credentials = "omit" : t.credentials = "same-origin",
                t
        }(e);
        fetch(e.href, t)
    }
}(),
    "undefined" != typeof window && window.SwiperElementRegisterParams && window.SwiperElementRegisterParams(["shuttersEffect"]);
const i = new e(".swiper", {
    modules: [t, s, r, function ({ swiper: e, extendParams: t, on: s }) {
        t({
            shuttersEffect: {
                split: 5
            }
        }),
            s("beforeInit", (() => {
                if ("shutters" !== e.params.effect)
                    return;
                e.classNames.push("swiper-shutters");
                const t = {
                    watchSlidesProgress: !0,
                    parallax: {
                        enabled: !0
                    }
                };
                Object.assign(e.params, t),
                    Object.assign(e.originalParams, t)
            }
            )),
            s("init", (() => {
                "shutters" === e.params.effect && e.slides.forEach((t => {
                    const s = t.querySelector(".swiper-shutters-image");
                    if (!s)
                        return;
                    const r = s.nextElementSibling
                        , i = document.createElement("div");
                    i.classList.add("swiper-shutters-image-clones");
                    for (let a = 0; a < e.params.shuttersEffect.split; a += 1) {
                        const e = document.createElement("div");
                        e.classList.add("swiper-shutters-image-clone"),
                            e.appendChild(s.cloneNode()),
                            i.appendChild(e)
                    }
                    r ? s.parentNode.insertBefore(i, r) : s.parentNode.appendChild(i)
                }
                ))
            }
            )),
            s("resize init", (() => {
                "shutters" === e.params.effect && (e.el.querySelectorAll(".swiper-shutters-image").forEach((t => {
                    t.style.width = `${e.width}px`,
                        t.style.height = `${e.height}px`
                }
                )),
                    e.el.querySelectorAll(".swiper-slide, swiper-slide").forEach((t => {
                        t.querySelectorAll(".swiper-shutters-image-clone").forEach(((t, s) => {
                            const r = 100 / e.params.shuttersEffect.split
                                , i = t.querySelector(".swiper-shutters-image");
                            "vertical" === e.params.direction ? (t.style.height = 100 / e.params.shuttersEffect.split + "%",
                                t.style.top = 100 / e.params.shuttersEffect.split * s + "%",
                                i.style.top = `-${100 * s}%`) : (t.style.width = 100 / e.params.shuttersEffect.split + "%",
                                    t.style.left = 100 / e.params.shuttersEffect.split * s + "%",
                                    i.style.left = `-${100 * s}%`),
                                i.setAttribute("data-swiper-parallax", "10%"),
                                t.setAttribute("data-swiper-parallax", r * (s + 1) * (s % 2 == 0 ? .5 : -1) + "%")
                        }
                        ))
                    }
                    )))
            }
            ))
    }
    ],
    effect: "shutters",
    shuttersEffect: {
        split: 5
    },
    speed: 900,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination"
    }
});
window.swiper = i;
