"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function SiteInteractions() {
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    const listen = (target, event, callback, options = {}) =>
      target?.addEventListener(event, callback, {
        ...options,
        signal: controller.signal,
      });
    let autoTimer;

    document.documentElement.classList.add("js");
    const $ = (s, r = document) => r.querySelector(s),
      $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    $$(".reveal").forEach((el) => observer.observe(el));
    $$("nav a").forEach((a) =>
      a.classList.toggle(
        "active",
        Boolean(a.getAttribute("href")) && location.pathname.replace(/\/$/, "") ===
          new URL(a.href).pathname.replace(/\/$/, ""),
      ),
    );
    let lastFocus;
    function openModal(id) {
      lastFocus = document.activeElement;
      const d = $(id);
      if (!d.open) d.showModal();
      document.body.classList.add("modal-open");
    }
    function closeModal(d) {
      d.close();
      document.body.classList.remove("modal-open");
      lastFocus?.focus();
    }
    $$("dialog").forEach((d) => {
      listen(d, "click", (e) => {
        if (e.target === d) {
          const r = d.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            closeModal(d);
        }
      });
      listen($(".modal-close", d), "click", () => closeModal(d));
      listen(d, "cancel", () => document.body.classList.remove("modal-open"));
    });
    $$("[data-photo]").forEach((button) => {
      listen(button, "click", () => {
        const image = document.querySelector("#photo-dialog img");
        image.src = button.dataset.photo;
        image.alt = button.querySelector("img").alt;
        openModal("#photo-dialog");
      });
    });
    $$("[data-book]").forEach((button) => {
      listen(button, "click", () => openModal("#booking-dialog"));
    });
    function enquiry(program = "") {
      const prompt = $(".callback-prompt");
      if (prompt) prompt.hidden = true;
      if (program) $('select[name="program"]').value = program;
      $(".form-result").textContent = "";
      openModal("#enquiry");
      try {
        sessionStorage.setItem("pathak-enquiry-seen", "1");
      } catch {}
    }
    $$("[data-enquire]").forEach((b) =>
      listen(b, "click", () => enquiry(b.dataset.enquire)),
    );
    let autoSeen = false;
    try {
      autoSeen = !!sessionStorage.getItem("pathak-enquiry-seen");
    } catch {}
    if (!autoSeen) {
      autoTimer = setInterval(() => {
        if (
          !document.hidden &&
          !$("dialog[open]") &&
          $(".mobile-menu").hidden
        ) {
          const prompt = $(".callback-prompt");
          if (prompt) prompt.hidden = false;
          try {
            sessionStorage.setItem("pathak-enquiry-seen", "1");
          } catch {}
          clearInterval(autoTimer);
        }
      }, 30000);
    }
    const menu = $(".mobile-menu"),
      menuBtn = $(".menu-button");
    listen(menuBtn, "click", () => {
      menu.hidden = !menu.hidden;
      menuBtn.setAttribute("aria-expanded", String(!menu.hidden));
      menuBtn.setAttribute(
        "aria-label",
        menu.hidden ? "Open menu" : "Close menu",
      );
      document.body.classList.toggle("modal-open", !menu.hidden);
    });
    listen(document, "keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) {
        menu.hidden = true;
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("modal-open");
        menuBtn.focus();
      }
    });
    if (!reduced && matchMedia("(pointer:fine)").matches) {
      $$(".event").forEach((el) => {
        listen(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width - 0.5,
            y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
        });
        listen(el, "pointerleave", () => (el.style.transform = ""));
      });
    }

    // Capsule reflections follow the pointer; motion respects accessibility preferences.
    const capsuleHeader = document.querySelector(".header");
    function updateCapsuleHeader() {
      capsuleHeader?.classList.toggle("scrolled", window.scrollY > 20);
    }
    listen(window, "scroll", updateCapsuleHeader, { passive: true });
    updateCapsuleHeader();
    if (!reduced && matchMedia("(pointer:fine)").matches) {
      $$(".pathway,.event.pending").forEach((el) => {
        listen(el, "pointermove", (e) => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty(
            "--shine-x",
            ((e.clientX - rect.left) / rect.width) * 100 + "%",
          );
          el.style.setProperty(
            "--shine-y",
            ((e.clientY - rect.top) / rect.height) * 100 + "%",
          );
        });
        listen(el, "pointerleave", () => {
          el.style.removeProperty("--shine-x");
          el.style.removeProperty("--shine-y");
        });
      });
    }

    const promptClose = document.querySelector(".prompt-close");
    listen(promptClose, "click", () => {
      document.querySelector(".callback-prompt").hidden = true;
    });
    // Compact horizontal rails work with touch, keyboard and desktop controls.
    $$(
      ".review-rail,.reel-rail,.player-rail,.partner-grid,.events-grid,.insights .blog-grid,.plans",
    ).forEach((rail) => {
      rail.tabIndex = 0;
      listen(rail, "keydown", (e) => {
        if (e.target !== rail) return;
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          rail.scrollBy({
            left:
              (e.key === "ArrowRight" ? 1 : -1) *
              (rail.firstElementChild.getBoundingClientRect().width + 20),
            behavior: reduced ? "instant" : "smooth",
          });
        }
      });
    });
    // Position the mobile menu beneath the floating header, including the announcement bar.
    function alignMobileMenu() {
      if (capsuleHeader)
        document.documentElement.style.setProperty(
          "--menu-top",
          capsuleHeader.getBoundingClientRect().bottom + 10 + "px",
        );
    }
    listen(menuBtn, "click", alignMobileMenu);
    listen(window, "resize", alignMobileMenu);
    listen(
      window,
      "scroll",
      () => {
        if (!menu.hidden) alignMobileMenu();
      },
      { passive: true },
    );
    alignMobileMenu(); // Keep country identity, dial code and the normalized phone number as distinct form fields.
    const leadForm = $("#enquiry-form"),
      leadCountry = $('[name="country"]', leadForm),
      leadPhone = $('[name="phone"]', leadForm);
    function updateLeadPhone(showError = false) {
      const opt = leadCountry.selectedOptions[0],
        dial = opt.dataset.dial;
      $("#phone-prefix").textContent = dial;
      $('[name="country_name"]', leadForm).value = opt.dataset.countryName;
      $('[name="dial_code"]', leadForm).value = dial;
      $('[name="phone_international"]', leadForm).value = "";
      leadPhone.setCustomValidity("");
      const raw = leadPhone.value.trim();
      let parsed;
      try {
        parsed = window.libphonenumber?.parsePhoneNumberFromString(
          raw,
          leadCountry.value,
        );
      } catch {}
      const valid =
        parsed?.isValid() &&
        parsed.countryCallingCode === dial.slice(1) &&
        (!parsed.country || parsed.country === leadCountry.value);
      if (valid) {
        $('[name="phone_international"]', leadForm).value = parsed.number;
        $("#phone-preview").textContent =
          "International number: " + parsed.formatInternational();
      } else {
        $("#phone-preview").textContent = raw
          ? "Check the number and selected country."
          : "Country code: " + dial;
        if (showError && raw)
          leadPhone.setCustomValidity(
            "Enter a valid phone number for the selected country.",
          );
      }
      return valid;
    }
    listen(leadCountry, "change", () => updateLeadPhone());
    listen(leadPhone, "input", () => updateLeadPhone());
    listen(leadPhone, "blur", () => updateLeadPhone(true));
    listen(leadForm, "reset", () => queueMicrotask(() => updateLeadPhone()));
    listen(leadForm, "submit", (e) => {
      e.preventDefault();
      const valid = updateLeadPhone(true);
      if (!valid || !leadForm.reportValidity()) {
        leadPhone.reportValidity();
        return;
      }
      $(".form-result").textContent =
        "Preview complete. Country: " +
        $('[name="country_name"]', leadForm).value +
        ". Phone: " +
        $('[name="phone_international"]', leadForm).value +
        ". No details have been sent.";
    });
    updateLeadPhone();

    const processMedia = matchMedia("(min-width: 761px)");
    const setProcess = () =>
      document
        .querySelectorAll(".compact-process details")
        .forEach((detail) => {
          detail.open = processMedia.matches;
        });
    setProcess();
    listen(processMedia, "change", setProcess);
    window.instgrm?.Embeds.process();
    return () => {
      controller.abort();
      observer.disconnect();
      clearInterval(autoTimer);
      document.body.classList.remove("modal-open");
      if (!menu.hidden) {
        menu.hidden = true;
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      }
      document
        .querySelectorAll("dialog[open]")
        .forEach((dialog) => dialog.close());
    };
  }, [pathname]);
  return ["/action-analysis"].some(
    (route) => pathname.startsWith(route),
  ) ? (
    <Script
      src="https://www.instagram.com/embed.js"
      strategy="afterInteractive"
      onReady={() => window.instgrm?.Embeds.process()}
    />
  ) : null;
}
