const DebugJump = (function () {
    'use strict';

    var el = null;
    var visible = false;

    var LABELS = {
        'Day 1': [
            'Start', 'Prologue', 'SchoolArrival',
            'Day1UnknownHint', 'Day1UnknownHintSora', 'Day1UnknownHintHana',
            'MorningEvent', 'LunchTime', 'LunchTimeSoraWarm', 'LunchTimeHanaWarm',
            'LunchTimeChoice', 'Day1Afternoon',
            'HelpSora', 'Library',
            'GoWithHana', 'Rooftop'
        ],
        'Day 2': [
            'Day2Start', 'Day2SoraGreeting', 'Day2SoraGreetingHigh', 'Day2SoraGreetingNormal',
            'Day2HanaGreeting', 'Day2HanaGreetingHigh', 'Day2HanaGreetingNormal',
            'Day2ScienceLab', 'Day2ScienceLabSora', 'Day2ScienceLabHana', 'Day2ScienceLabSkip',
            'Day2Morning', 'Day2Evening', 'Day2NeutralEvening', 'Day2End',
            'Day2WithSora', 'Day2SoraEvening',
            'Day2WithHana', 'Day2HanaEvening'
        ],
        'Day 3': [
            'Day3Start', 'Day3PhotoDiscovery', 'Day3MainBranch', 'Day3BothHigh', 'Day3Balanced',
            'Day3SoraRoute', 'Day3SoraClimax', 'SoraConfess', 'SoraFriendEnd',
            'Day3HanaRoute', 'Day3HanaClimax', 'HanaConfess', 'HanaFriendEnd',
            'Day3TogetherRoute', 'Day3TogetherClimax', 'HiddenEnding', 'FriendshipEnding'
        ],
        'Day 4': [
            'Day4Start', 'Day4MeetUnknownHigh', 'Day4MeetUnknownNormal',
            'Day4Morning', 'Day4AskAboutSora', 'Day4AskAboutHana', 'Day4AskAboutAll',
            'Day4Lunch', 'Day4Evening',
            'Day4SoraAfternoon', 'Day4HanaAfternoon', 'Day4TogetherAfternoon'
        ],
        'Day 5': [
            'Day5SoraRoute', 'Day5SoraScience', 'Day5SoraConfess2', 'SoraTrueLoveEnd', 'SoraWarmEnd',
            'Day5HanaRoute', 'Day5HanaPool', 'Day5HanaConfess2', 'HanaTrueLoveEnd', 'HanaWarmEnd',
            'Day5TogetherRoute', 'Day5TogetherLetter'
        ]
    };

    var DAY_COLORS = {
        'Day 1': '#4fc3f7',
        'Day 2': '#81c784',
        'Day 3': '#ffb74d',
        'Day 4': '#e57373',
        'Day 5': '#ba68c8'
    };

    function create () {
        el = document.createElement('div');
        el.id = 'debug-jump';
        el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;' +
            'background:rgba(0,0,0,0.92);color:#eee;font:13px/1.5 monospace;' +
            'pointer-events:auto;display:none;overflow-y:auto;padding:0;';

        var inner = document.createElement('div');
        inner.style.cssText = 'max-width:900px;margin:0 auto;padding:20px 24px 40px;';

        // Header
        var header = document.createElement('div');
        header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;' +
            'margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #444;';

        var title = document.createElement('div');
        title.innerHTML = '<b style="color:#fff;font-size:16px">[Scene Jump]</b>' +
            '<span id="debug-jump-current" style="color:#888;margin-left:12px;font-size:12px"></span>';

        var closeBtn = document.createElement('button');
        closeBtn.textContent = '\u2715';
        closeBtn.style.cssText = 'background:none;border:1px solid #555;color:#aaa;font-size:18px;' +
            'cursor:pointer;padding:2px 8px;border-radius:4px;';
        closeBtn.addEventListener('click', function () { toggle(); });

        header.appendChild(title);
        header.appendChild(closeBtn);
        inner.appendChild(header);

        // Day groups
        var days = Object.keys(LABELS);
        for (var d = 0; d < days.length; d++) {
            var day = days[d];
            var color = DAY_COLORS[day];
            var labels = LABELS[day];

            var group = document.createElement('div');
            group.style.cssText = 'margin-bottom:16px;';

            var groupHeader = document.createElement('div');
            groupHeader.textContent = day;
            groupHeader.style.cssText = 'color:' + color + ';font-size:13px;font-weight:bold;' +
                'margin-bottom:8px;padding:4px 8px;border-left:3px solid ' + color + ';';

            group.appendChild(groupHeader);

            var grid = document.createElement('div');
            grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';

            for (var i = 0; i < labels.length; i++) {
                (function (label, dayColor) {
                    var btn = document.createElement('button');
                    btn.textContent = label;
                    btn.dataset.label = label;
                    btn.style.cssText = 'background:rgba(255,255,255,0.08);border:1px solid #444;' +
                        'color:#ddd;font:11px/1.4 monospace;padding:4px 10px;border-radius:4px;' +
                        'cursor:pointer;transition:background 0.15s,border-color 0.15s;';
                    btn.addEventListener('mouseenter', function () {
                        btn.style.background = 'rgba(255,255,255,0.18)';
                        btn.style.borderColor = dayColor;
                    });
                    btn.addEventListener('mouseleave', function () {
                        if (!btn.classList.contains('debug-jump-active')) {
                            btn.style.background = 'rgba(255,255,255,0.08)';
                            btn.style.borderColor = '#444';
                        }
                    });
                    btn.addEventListener('click', function () { jumpTo(label); });
                    grid.appendChild(btn);
                })(labels[i], color);
            }

            group.appendChild(grid);
            inner.appendChild(group);
        }

        // Footer
        var footer = document.createElement('div');
        footer.style.cssText = 'color:#666;font-size:11px;text-align:center;margin-top:20px;' +
            'padding-top:12px;border-top:1px solid #333;';
        footer.textContent = 'F10: toggle | ESC: close | F9: affinity debug';
        inner.appendChild(footer);

        el.appendChild(inner);
        document.body.appendChild(el);
    }

    function getCurrentLabel () {
        try {
            return monogatari.state('label') || '';
        } catch (e) {
            return '';
        }
    }

    function highlightCurrent () {
        if (!el) return;
        var current = getCurrentLabel();
        var indicator = document.getElementById('debug-jump-current');
        if (indicator) {
            indicator.textContent = current ? '\u25B6 ' + current : '';
        }

        var buttons = el.querySelectorAll('button[data-label]');
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            btn.classList.remove('debug-jump-active');
            if (btn.dataset.label === current) {
                btn.classList.add('debug-jump-active');
                btn.style.background = '#fff3';
                btn.style.borderColor = '#fff';
                btn.style.color = '#fff';
            } else {
                btn.style.background = 'rgba(255,255,255,0.08)';
                btn.style.borderColor = '#444';
                btn.style.color = '#ddd';
            }
        }
    }

    function jumpTo (label) {
        var gameScreen = document.querySelector('game-screen');
        if (!gameScreen || !gameScreen.classList.contains('active')) {
            console.warn('[DebugJump] game-screen not active. Start or load a game first.');
            return;
        }
        toggle();
        try {
            monogatari.run('show scene #000000 with fadeIn');
            monogatari.run('jump ' + label);
            console.log('[DebugJump] Jumped to: ' + label);
        } catch (e) {
            console.error('[DebugJump] Jump failed:', e);
        }
    }

    function toggle () {
        if (!el) create();
        visible = !visible;
        el.style.display = visible ? 'block' : 'none';
        if (visible) highlightCurrent();
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'F10') {
            e.preventDefault();
            toggle();
        }
        if (e.key === 'Escape' && visible) {
            toggle();
        }
    });

    return { toggle: toggle };
})();
