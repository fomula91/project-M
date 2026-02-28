const DebugAffinity = (function () {
    'use strict';

    var el = null;
    var visible = false;

    function create () {
        el = document.createElement('div');
        el.id = 'debug-affinity';
        el.style.cssText = 'position:fixed;top:8px;left:8px;z-index:99999;' +
            'background:rgba(0,0,0,0.85);color:#0f0;font:12px/1.6 monospace;' +
            'padding:8px 12px;border-radius:6px;pointer-events:none;display:none;';
        document.body.appendChild(el);
    }

    function update () {
        if (!el || !visible) return;
        var s = monogatari.storage();
        el.innerHTML =
            '<b style="color:#fff">[Affinity Debug]</b><br>' +
            '소라: <b>' + s.sora_affection + '</b><br>' +
            '하나: <b>' + s.hana_affection + '</b><br>' +
            '유우: <b>' + s.unknown_interest + '</b>';
    }

    function toggle () {
        if (!el) create();
        visible = !visible;
        el.style.display = visible ? 'block' : 'none';
        if (visible) update();
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'F9') toggle();
    });
    document.addEventListener('click', function () {
        if (visible) update();
    });

    return { toggle: toggle, update: update };
})();
