// ─── Theme Toggle ────────────────────────────────────────────────────────────
const themeToggleBtn = document.getElementById("themeToggle");
let currentTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", currentTheme);

function updateThemeIcon() {
	themeToggleBtn.innerHTML =
		currentTheme === "dark"
			? '<i class="fas fa-moon"></i>'
			: '<i class="fas fa-sun"></i>';
}
updateThemeIcon();

themeToggleBtn.addEventListener("click", () => {
	currentTheme = currentTheme === "dark" ? "light" : "dark";
	document.documentElement.setAttribute("data-theme", currentTheme);
	localStorage.setItem("theme", currentTheme);
	updateThemeIcon();
});

// ─── Mobile Menu ─────────────────────────────────────────────────────────────
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
	navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("active");
	});
});

// ─── Smooth Scrolling ────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			window.scrollTo({
				top: target.offsetTop - 70,
				behavior: "smooth",
			});
		}
	});
});

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────
const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollProgress() {
	const scrollTop = window.scrollY;
	const docHeight = document.documentElement.scrollHeight - window.innerHeight;
	scrollProgress.style.width =
		docHeight > 0 ? (scrollTop / docHeight) * 100 + "%" : "0%";
}

// ─── Back to Top Button ───────────────────────────────────────────────────────
const backToTopBtn = document.querySelector(".back-to-top");

function updateBackToTop() {
	if (window.scrollY > 500) {
		backToTopBtn.classList.add("visible");
	} else {
		backToTopBtn.classList.remove("visible");
	}
}

backToTopBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

// ─── Active Nav Link Highlighting ─────────────────────────────────────────────
function updateActiveNav() {
	const atBottom =
		window.innerHeight + window.scrollY >=
		document.documentElement.scrollHeight - 5;

	let current = "";
	if (atBottom) {
		const sections = document.querySelectorAll("section");
		current = sections[sections.length - 1].getAttribute("id");
	} else {
		document.querySelectorAll("section").forEach((section) => {
			if (window.scrollY >= section.offsetTop - 100) {
				current = section.getAttribute("id");
			}
		});
	}

	document.querySelectorAll(".nav-links a").forEach((link) => {
		link.classList.toggle(
			"active",
			link.getAttribute("href") === `#${current}`,
		);
	});
}

// ─── Parallax Hero ────────────────────────────────────────────────────────────
function updateHeroParallax() {
	const scrolled = window.scrollY;
	const hero = document.querySelector(".hero-content");
	if (hero) {
		hero.style.transform = `translateY(${scrolled * 0.5}px)`;
		hero.style.opacity = 1 - scrolled / 700;
	}
}

// Combined scroll handler
window.addEventListener(
	"scroll",
	() => {
		updateScrollProgress();
		updateBackToTop();
		updateActiveNav();
		updateHeroParallax();
	},
	{ passive: true },
);

// ─── Intersection Observer — fade-in on scroll ────────────────────────────────
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animated");
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document
	.querySelectorAll(".animate-on-scroll")
	.forEach((el) => observer.observe(el));

// ─── Typewriter Animation ─────────────────────────────────────────────────────
const subtitle = document.querySelector(".hero-subtitle");
const subtitleText = subtitle.textContent.trim();
subtitle.textContent = "";

// Insert cursor INSIDE the subtitle so it sits right after the typed text
const cursor = document.createElement("span");
cursor.className = "typing-cursor";
cursor.textContent = "|";
subtitle.appendChild(cursor); // ← inside, not afterend

let i = 0;
function typeWriter() {
	if (i < subtitleText.length) {
		// Insert text node before the cursor each time
		cursor.insertAdjacentText("beforebegin", subtitleText.charAt(i));
		i++;
		setTimeout(typeWriter, 50);
	} else {
		setTimeout(() => {
			cursor.style.transition = "opacity 0.5s ease";
			cursor.style.opacity = "0";
			setTimeout(() => cursor.remove(), 500);
		}, 3000);
	}
}
setTimeout(typeWriter, 1000);
// ─── Skill Item Hover Effect ──────────────────────────────────────────────────
document.querySelectorAll(".skill-item").forEach((item) => {
	item.addEventListener("mouseenter", function () {
		this.style.transform = "scale(1.1) rotate(2deg)";
	});
	item.addEventListener("mouseleave", function () {
		this.style.transform = "scale(1) rotate(0deg)";
	});
});

// ─── Counter Animation for Stats ─────────────────────────────────────────────
function animateCounter(element, target, duration = 2000) {
	const increment = target / (duration / 16);
	let current = 0;
	const timer = setInterval(() => {
		current += increment;
		if (current >= target) {
			current = target;
			clearInterval(timer);
		}
		element.textContent =
			target % 1 !== 0 ? current.toFixed(2) : Math.floor(current) + "+";
	}, 16);
}

const statsObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.querySelectorAll(".stat-number").forEach((stat) => {
					const target = parseFloat(stat.textContent);
					stat.textContent = "0";
					animateCounter(stat, target);
				});
				statsObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 },
);

const statsSection = document.querySelector(".stats-grid");
if (statsSection) statsObserver.observe(statsSection);

// ─── Dynamic Mouse Gradient Background ───────────────────────────────────────
const bgAnimation = document.querySelector(".bg-animation");

document.addEventListener(
	"mousemove",
	(e) => {
		const x = (e.clientX / window.innerWidth) * 100;
		const y = (e.clientY / window.innerHeight) * 100;
		bgAnimation.style.background = `
        radial-gradient(circle at ${x}% ${y}%,
        rgba(120, 58, 237, 0.2) 0%, transparent 50%)
    `;
	},
	{ passive: true },
);

// ─── Project Panel ────────────────────────────────────────────────────────────
const projectPanel = document.getElementById("projectPanel");
const panelTitle = document.getElementById("panelTitle");
const panelDescription = document.getElementById("panelDescription");
const panelExtra = document.getElementById("panelExtra");
const closePanelBtn = document.getElementById("closePanel");
const projectsGridEl = document.querySelector(".projects-grid");

function openProjectPanel(projectKey) {
	if (!projectPanel) return;

	if (projectKey === "eshu") {
		panelTitle.textContent = "Eshu / Ender Project";
		panelDescription.textContent =
			"A Flask-based unified control interface integrating Metasploit and Sliver post-exploitation frameworks. Features REST APIs for 10+ interactive commands, Docker containerization, and a 40% reduction in workflow overhead.";
		panelExtra.innerHTML = `
			<p class="card-label">Repository</p>
			<a href="https://github.com/ender-js/Ender" target="_blank" rel="noopener" class="link-card">
				<div class="github-card-header">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
					<span class="repo-name">ender-js/Ender</span>
					<span class="repo-cta">View on GitHub →</span>
				</div>
			</a>

			<p class="card-label" style="margin-top:8px;">Project Overview & Demo</p>
			<div class="media-card">
				<iframe src="https://www.youtube.com/embed/vl5vy-sqajg" width="100%" height="220" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen title="Capstone Final Recording" style="display:block;"></iframe>
				<div class="media-caption">Capstone final presentation — pitch, architecture, and live demo</div>
			</div>

			<p class="card-label">Technical Deep Dive</p>
			<div class="media-card">
				<iframe src="https://www.youtube.com/embed/Tm72SPsEGk0" width="100%" height="220" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen title="Project Eshu - ProDefense" style="display:block;"></iframe>
				<div class="media-caption">In-depth walkthrough of the Eshu/Ender architecture and C2 integration</div>
			</div>

			<p class="card-label">RPC & Metasploit Integration</p>
			<div class="media-card">
				<iframe src="https://www.youtube.com/embed/v23kk6d4wy4" width="100%" height="220" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen title="RPC Communication in Metasploit" style="display:block;"></iframe>
				<div class="media-caption">Individual deep dive — automating Metasploit exploits via RPC & Python</div>
			</div>
		`;
	} else if (projectKey === "robotics") {
		panelTitle.textContent = "Robotics & Autonomous Systems";
		panelDescription.textContent =
			"Autonomous robotic systems built with the Dobot Magician Lite — including maze solving via OpenCV, agentic AI using the Claude API, vision-guided Tic-Tac-Toe with Minimax, and a pick-and-place pipeline.";
		panelExtra.innerHTML = `
			<p class="card-label">Tic-Tac-Toe via Computer Vision</p>
			<a href="https://www.linkedin.com/posts/yalsabah_robotics-artificialintelligence-automation-activity-7385157165881151488-iPOw"
			   target="_blank" rel="noopener" class="link-card">
				<div class="link-card-header" style="background:linear-gradient(135deg,#0a66c2,#004182);">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
					<span style="color:white; font-weight:600; font-size:13px;">Playing Tic-Tac-Toe with Dobot Magician</span>
				</div>
				<div class="link-card-footer">
					<span class="caption">Vision-guided Tic-Tac-Toe with Minimax & OpenCV</span>
					<span class="cta">▶ Open →</span>
				</div>
			</a>

			<p class="card-label">Agentic AI Maze Solving</p>
			<a href="https://www.linkedin.com/posts/yalsabah_robotics-schoolofmanufacturingsystemsandnetworks-activity-7392682818641850368-7Fwr"
			   target="_blank" rel="noopener" class="link-card">
				<div class="link-card-header" style="background:linear-gradient(135deg,#0a66c2,#004182);">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
					<span style="color:white; font-weight:600; font-size:13px;">Solving a Maze Using Agentic AI</span>
				</div>
				<div class="link-card-footer">
					<span class="caption">Dobot Magician Lite with Claude API & computer vision</span>
					<span class="cta">▶ Open →</span>
				</div>
			</a>

			<p class="card-label">LLM/VLM-Guided Pick-and-Place</p>
			<div class="media-card">
				<iframe src="https://www.youtube.com/embed/WHG77sXhat8" width="100%" height="280" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen title="Autonomous LLM/VLM-Guided Pick-and-Place" style="display:block;"></iframe>
				<div class="media-caption">Autonomous LLM/VLM-Guided Pick-and-Place Using Agentic AI & Monocular Depth Estimation</div>
			</div>
		`;
	} else {
		panelTitle.textContent = "Project Details";
		panelDescription.textContent = "";
		panelExtra.innerHTML = "";
	}

	projectPanel.classList.add("open");
	projectPanel.setAttribute("aria-hidden", "false");
	if (projectsGridEl) projectsGridEl.classList.add("shifted");
}

let activeBtn = null;

function closePanel() {
	projectPanel.classList.remove("open");
	projectPanel.setAttribute("aria-hidden", "true");
	if (projectsGridEl) projectsGridEl.classList.remove("shifted");
	if (activeBtn) {
		activeBtn.textContent = "View More →";
		activeBtn = null;
	}
}

document.querySelectorAll(".view-more-btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		if (activeBtn === btn) {
			closePanel();
			return;
		}
		if (activeBtn) {
			activeBtn.textContent = "View More →";
		}
		activeBtn = btn;
		btn.textContent = "View Less ←";
		openProjectPanel(btn.dataset.project);
	});
});

if (closePanelBtn) {
	closePanelBtn.addEventListener("click", closePanel);
}

// Close panel on Escape
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && projectPanel.classList.contains("open")) {
		closePanel();
	}
});

// ─── Custom Cursor ────────────────────────────────────────────────────────────
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const cursorToggleBtn = document.getElementById("cursorToggle");

// Persist cursor preference; default ON
let cursorEnabled = localStorage.getItem("customCursor") !== "false";

function applyCursorState() {
	const isOn = cursorEnabled && window.matchMedia("(pointer: fine)").matches;

	// Toggle a class on <html> — CSS handles cursor:none cleanly
	document.documentElement.classList.toggle("custom-cursor-active", isOn);

	if (cursorDot) cursorDot.style.opacity = isOn ? "1" : "0";
	if (cursorRing) cursorRing.style.opacity = isOn ? "0.6" : "0";

	if (cursorToggleBtn) {
		cursorToggleBtn.classList.toggle("cursor-off", !cursorEnabled);
		cursorToggleBtn.setAttribute(
			"aria-label",
			cursorEnabled ? "Disable custom cursor" : "Enable custom cursor",
		);
		cursorToggleBtn.setAttribute(
			"title",
			cursorEnabled ? "Disable custom cursor" : "Enable custom cursor",
		);
	}
}

if (cursorToggleBtn) {
	cursorToggleBtn.addEventListener("click", () => {
		cursorEnabled = !cursorEnabled;
		localStorage.setItem("customCursor", cursorEnabled);
		applyCursorState();
	});
}

if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
	let mouseX = 0,
		mouseY = 0,
		ringX = 0,
		ringY = 0;

	document.addEventListener(
		"mousemove",
		(e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			cursorDot.style.left = mouseX + "px";
			cursorDot.style.top = mouseY + "px";
		},
		{ passive: true },
	);

	// Ring follows with smooth lag
	(function animateRing() {
		ringX += (mouseX - ringX) * 0.15;
		ringY += (mouseY - ringY) * 0.15;
		cursorRing.style.left = ringX + "px";
		cursorRing.style.top = ringY + "px";
		requestAnimationFrame(animateRing);
	})();

	// Hover expand on interactive elements
	const interactives =
		"a, button, .btn, .view-more-btn, .skill-item, .project-card, .link-card, .media-card";
	document.addEventListener("mouseover", (e) => {
		if (e.target.closest(interactives))
			document.body.classList.add("cursor-hover");
	});
	document.addEventListener("mouseout", (e) => {
		if (e.target.closest(interactives))
			document.body.classList.remove("cursor-hover");
	});

	// Click pulse
	document.addEventListener("mousedown", () =>
		document.body.classList.add("cursor-click"),
	);
	document.addEventListener("mouseup", () =>
		document.body.classList.remove("cursor-click"),
	);

	// Hide when mouse leaves window
	document.addEventListener("mouseleave", () => {
		if (cursorDot) cursorDot.style.opacity = "0";
		if (cursorRing) cursorRing.style.opacity = "0";
	});
	document.addEventListener("mouseenter", () => {
		if (!cursorEnabled) return;
		if (cursorDot) cursorDot.style.opacity = "1";
		if (cursorRing) cursorRing.style.opacity = "0.6";
	});
}

// Apply saved preference on load
applyCursorState();

// ─── Console Easter Egg ───────────────────────────────────────────────────────
console.log(
	"%c👋 Welcome to my portfolio!",
	"font-size: 20px; font-weight: bold; color: #00d4ff;",
);
console.log(
	"%cInterested in the code? Check out the source!",
	"font-size: 14px; color: #b4b4c8;",
);
