// Véletlenszerű, ritka villámlás; inaktív lapon és csökkentett mozgásnál szünetel.
    (() => {
        const lightning = document.getElementById('halloweenLightning');
        const toggle = document.getElementById('effectsToggle');
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let enabled = !motion.matches;
        let lightningTimer;
        const stopLightning = () => {
            clearTimeout(lightningTimer);
            lightning.classList.remove('is-striking');
        };
        const scheduleLightning = () => {
            stopLightning();
            if (!enabled || motion.matches || document.hidden) return;
            lightningTimer = window.setTimeout(() => {
                lightning.style.setProperty('--strike-x', (12 + Math.random() * 76) + '%');
                lightning.style.setProperty('--strike-angle', (-14 + Math.random() * 28) + 'deg');
                lightning.classList.add('is-striking');
            }, 12000 + Math.random() * 16000);
        };
        const updateEffects = () => {
            const active = enabled && !motion.matches;
            document.body.classList.toggle('halloween-effects-paused', !active || document.hidden);
            toggle.setAttribute('aria-pressed', String(active));
            toggle.textContent = active ? 'EFFEKTEK KI' : 'EFFEKTEK BE';
            toggle.setAttribute('aria-label', motion.matches ? 'Animációk kikapcsolva a rendszer csökkentett mozgás beállítása miatt' : active ? 'Halloween animációk kikapcsolása' : 'Halloween animációk bekapcsolása');
            toggle.disabled = motion.matches;
            scheduleLightning();
        };
        toggle.addEventListener('click', () => { enabled = !enabled; updateEffects(); });
        lightning.addEventListener('animationend', event => {
            if (event.target === lightning) scheduleLightning();
        });
        document.addEventListener('visibilitychange', updateEffects);
        motion.addEventListener('change', () => { enabled = !motion.matches; updateEffects(); });
        window.addEventListener('pagehide', stopLightning);
        window.addEventListener('pageshow', updateEffects);
        updateEffects();
    })();