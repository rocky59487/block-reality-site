/**
 * Block Reality — Minecraft 方塊碎裂粒子特效 & 站內連結預載入
 */

// 使用者在系統設定裡關掉動畫時，整個特效跳過，連結也不延遲。
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 粒子噴發看得見的時間。這是「刻意」多花的，不是加速——
// 換頁本身沒有變快，是我們晚 160ms 才送出跳轉，讓爆點看得完。
const BURST_MS = 160;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".mc-btn").forEach((btn) => {
    const targetUrl = btn.getAttribute("href");
    const isInternalLink =
      targetUrl &&
      !btn.getAttribute("target") &&
      !btn.hasAttribute("download") &&
      !targetUrl.startsWith("#") &&
      !/^[a-z]+:/i.test(targetUrl);

    // 滑鼠移上去就先在背景把下一頁抓回快取。
    if (isInternalLink) {
      btn.addEventListener("mouseenter", () => prefetchPage(targetUrl), { once: true });
    }

    btn.addEventListener("click", function (e) {
      if (!reducedMotion) {
        const rect = this.getBoundingClientRect();
        burst(
          e.clientX || rect.left + rect.width / 2,
          e.clientY || rect.top + rect.height / 2
        );
      }

      // 只接管「單純的左鍵點擊」。Ctrl / Cmd / Shift / Alt / 中鍵都是使用者
      // 明確要求開新分頁或新視窗——把它們也 preventDefault 掉的話，新分頁開了，
      // 當前分頁還會跟著跳走，兩邊都不是他要的。
      const plainClick =
        e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;

      if (isInternalLink && plainClick && !reducedMotion) {
        e.preventDefault();
        prefetchPage(targetUrl);
        setTimeout(() => {
          window.location.href = targetUrl;
        }, BURST_MS);
      }
    });
  });
});

/**
 * 背景預載入。<link rel="prefetch"> 一個就夠了——
 * 再補一次 fetch() 只會把同一份東西下載兩次。
 */
const prefetchedUrls = new Set();
function prefetchPage(url) {
  if (prefetchedUrls.has(url)) return;
  prefetchedUrls.add(url);

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  document.head.appendChild(link);
}

/* ---------- 粒子 ---------- */

// Minecraft 方塊色盤（紅石、深磚、熔岩、泥土、黑石、砂金）
const MC_COLORS = [
  "#e0533d", "#c0392b", "#e67e22", "#d35400",
  "#8c5828", "#5c3c1e", "#f39c12", "#2c3e50",
];

const PARTICLE_COUNT = 28;
const GRAVITY = 0.28;
const FRICTION = 0.98;
const FADE = 0.016;

// 所有粒子共用一個 requestAnimationFrame 迴圈。
// 原本是一顆粒子一個迴圈，一次點擊就排 28 個 callback 進去。
let live = [];
let running = false;

function burst(originX, originY) {
  const frag = document.createDocumentFragment();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const el = document.createElement("div");
    el.className = "mc-particle";

    const size = Math.floor(Math.random() * 6) + 4; // 4px ~ 9px
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.backgroundColor = MC_COLORS[Math.floor(Math.random() * MC_COLORS.length)];

    const p = {
      el,
      x: originX + (Math.random() - 0.5) * 14,
      y: originY + (Math.random() - 0.5) * 14,
      vx: (Math.random() - 0.5) * 8.5,
      vy: -(Math.random() * 5.5 + 3.5),
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 16,
      opacity: 1,
    };

    el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    frag.appendChild(el);
    live.push(p);
  }

  document.body.appendChild(frag);

  if (!running) {
    running = true;
    requestAnimationFrame(step);
  }
}

function step() {
  const next = [];

  for (const p of live) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += GRAVITY;
    p.vx *= FRICTION;
    p.rot += p.rotSpeed;
    p.opacity -= FADE;

    if (p.opacity <= 0) {
      p.el.remove();
      continue;
    }

    p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    p.el.style.opacity = p.opacity;
    next.push(p);
  }

  live = next;

  if (live.length) {
    requestAnimationFrame(step);
  } else {
    running = false;
  }
}
