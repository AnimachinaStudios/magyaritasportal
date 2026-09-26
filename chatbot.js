/* A válaszok helyi szövegkeresésből származnak. Nincs AI API vagy adatküldés. */
(() => {
  'use strict';
  if (document.getElementById('ac-chat')) return;
  const data = window.ANIMACHINA_CHAT_DATA;
  if (!data || !Array.isArray(data.faq)) return;
  const normalize = value => value.toLocaleLowerCase('hu').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const stop = new Set('a az es vagy hogy is en te mi mit mikor hol ki kik hogyan milyen mennyi melyik van vannak volt lesz lenne lehet tud tudsz kerlek szeretnek szeretnem egy ez azt azert meg mar csak nekem nekik rol rola e na igen nem kene kell koszi koszonom szia hello sziasztok'.split(' '));
  const tokens = text => [...new Set(normalize(text).split(' ').filter(x => x.length > 1 && !stop.has(x)))];
  const matching = (token, word) => token === word || (Math.min(token.length, word.length) >= 5 && (word.startsWith(token) || token.startsWith(word)));
  const sources = (...items) => items.map(([label, href]) => ({ label, href }));
  const contact = sources(['Kapcsolat', 'index.html#contact']);
  let previousTopic = '';
  let passages = data.passages || [];

  function answer(question) {
    const q = normalize(question);
    if (/^(szia|sziasztok|hello|hell[oó]|hali|jo napot)( |$)/.test(q) && tokens(q).length === 0) return { text: 'Szia! A magyarosításokról, a csatlakozásról, a koncertről és az Animachináról tudok információt keresni. Miben segíthetek?' };
    if (/^(koszi|koszonom|koszonjuk|rendben|oke)[ !.]*$/.test(q)) return { text: 'Szívesen! Ha van még kérdésed az oldalról, írd meg nyugodtan.' };
    // A névre és a meghívóra vonatkozó konkrét kérdések megelőzik az általános témakeresést.
    if (/\bzazaa(?:t|rol|nak|val)?\b|\bnemeth zalan(?:t|rol|nak|nal)?\b/.test(q)) {
      previousTopic = '';
      return {
        text: 'Zazaa Németh Zalán. A róla szóló információkat a Csapat oldalon vagy a Koncert oldalon találod meg.',
        sources: sources(['Csapat oldal', 'team.html'], ['Koncert oldal', 'koncert.html'])
      };
    }
    if (/\bdiscord(?:ot|on|ra|hoz|szerver(?:t|re|et|etek)?)?\b/.test(q) && !/szinkron|fordit|grafik|hang vag|csapatba|jelentkez|nem mukod|nem indul|hiba|email|e mail/.test(q)) {
      previousTopic = '';
      return {
        text: 'Itt a Discord-szerverünk meghívólinkje! Kattints az alábbi linkre a csatlakozáshoz.',
        sources: sources(['https://discord.com/invite/b3DNs98Dnz', 'https://discord.com/invite/b3DNs98Dnz'])
      };
    }
    let query = q;
    if (previousTopic === 'concert' && /^(es )?(hol|mikor|mennyibe|hany|kell jegy|ingyenes|korhatar)/.test(q) && tokens(q).length <= 2 && !/fejezet|poppy|patch|fordit|szinkron/.test(q)) query = `koncert ${q}`;
    const chapter = query.match(/(?:fejezet|chapter|poppy(?: playtime)?|ch)\s*([1-5])\b|\b([1-5])\s*(?:fejezet|chapter|resz)/);
    const ordinal = query.match(/\b(elso|masodik|harmadik|negyedik|otodik)\b/);
    const chapterNumber = chapter ? Number(chapter[1] || chapter[2]) : ordinal && /fejezet|resz|poppy/.test(query) ? ['elso','masodik','harmadik','negyedik','otodik'].indexOf(ordinal[1]) + 1 : null;
    if (chapterNumber) {
      previousTopic = '';
      const item = data.chapters.find(x => x.number === chapterNumber);
      return { text: item.text, sources: item.sources };
    }
    const ranked = data.faq.map(item => {
      const hits = item.keywords.filter(keyword => new RegExp(`\\b${normalize(keyword)}`).test(query));
      let score = hits.length * 3;
      if (item.id === 'join' && /csatlakoz|jelentkez|tagja|bekerul|dolgoznek|segitenek/.test(query)) score += 8;
      if (item.id === 'troubleshoot' && /nem mukod|nem indul|hiba|elroml|nem siker|segitseg/.test(query)) score += 12;
      if (item.id === 'concert' && /koncert|belepo|kapunyitas|korhatar|base bar/.test(query)) score += 8;
      if (item.id === 'install' && /telepit/.test(query)) score += 6;
      return { item, score };
    }).sort((a, b) => b.score - a.score);
    const words = tokens(query);
    const results = passages.map(p => {
      const contentWords = normalize(`${p.title} ${p.text}`).split(' ');
      const hits = words.filter(w => contentWords.some(v => matching(w, v)));
      return { p, hits: hits.length, ratio: hits.length / Math.max(words.length, 1) };
    }).filter(r => r.hits >= 2 && r.ratio >= .65 || words.length === 1 && words[0].length >= 3 && normalize(r.p.text).split(' ').includes(words[0])).sort((a, b) => b.ratio - a.ratio || b.hits - a.hits || a.p.text.length - b.p.text.length);
    // Személynévre és más konkrét részletre az oldal pontos szövege a jobb találat.
    if (results.length && (!ranked[0].score || /\bki\b|\bkik\b/.test(query) && ranked[0].score < 8)) {
      previousTopic = '';
      const p = results[0].p;
      return { text: `Ezt találtam az oldalon:\n\n${p.text}`, sources: sources([p.title, p.url]) };
    }
    if (ranked[0].score >= 3) {
      const item = ranked[0].item;
      previousTopic = item.id;
      return { text: item.text, sources: item.sources };
    }
    previousTopic = '';
    return { text: 'Erre nem találtam biztos választ az oldal információi között. Próbáld konkrétabban megfogalmazni, például a játék vagy a fejezet nevével. A csapatot a Discordon is megkérdezheted.', sources: contact };
  }

  const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8H5l-4 3 1.8-6A8 8 0 1 1 20 11.5Z" transform="translate(1 -1) scale(.95)"/><path d="M8 10h.01M12 10h.01M16 10h.01" stroke-width="2.8"/></svg>';
  const avatar = `<span class="ac-chat-avatar" aria-hidden="true">${icon}<img src="images/icon.jpg" alt="" width="43" height="43"></span>`;
  const root = document.createElement('aside');
  root.id = 'ac-chat';
  root.className = 'ac-chat';
  root.setAttribute('aria-label', 'Animachina chatbot');
  root.innerHTML = `
    <section id="ac-chat-panel" class="ac-chat-panel" role="dialog" aria-labelledby="ac-chat-title" hidden>
      <header class="ac-chat-header">
        ${avatar}
        <div class="ac-chat-heading"><h2 id="ac-chat-title" class="ac-chat-title">Animachina Doktora</h2><span class="ac-chat-subtitle">Az oldal infóiból válaszol</span></div>
        <button class="ac-chat-icon-button" id="ac-chat-reset" type="button" aria-label="Új beszélgetés" title="Új beszélgetés"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/></svg></button>
        <button class="ac-chat-icon-button" id="ac-chat-close" type="button" aria-label="Chat bezárása"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
      </header>
      <div class="ac-chat-messages" role="log" aria-label="Beszélgetés" aria-live="polite" aria-relevant="additions" tabindex="0"></div>
      <div class="ac-chat-suggestions" aria-label="Javasolt kérdések"></div>
      <form class="ac-chat-form">
        <label for="ac-chat-input" class="ac-chat-sr">Írd be a saját kérdésed</label>
        <div class="ac-chat-input-row"><input class="ac-chat-input" id="ac-chat-input" type="text" maxlength="500" placeholder="Írd ide a saját kérdésed…" autocomplete="off" enterkeyhint="send" aria-describedby="ac-chat-note"><button class="ac-chat-send" type="submit" aria-label="Kérdés elküldése" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7M12 5v15"/></svg></button></div>
        <p id="ac-chat-note" class="ac-chat-note">Oldalalapú kereső · A kérdésed ezen az eszközön marad.</p>
      </form>
    </section>
    <button class="ac-chat-launcher" type="button" aria-controls="ac-chat-panel" aria-expanded="false" aria-label="Animachina chatbot megnyitása">${avatar}<span>Kérdezz tőlünk!</span></button>`;
  // Hiányzó profilképnél megmarad a beszédbuborék-ikon.
  root.addEventListener('error', event => {
    if (event.target.matches('.ac-chat-avatar img')) event.target.remove();
  }, true);
  document.body.append(root);
  document.body.classList.add('ac-chat-ready');
  const panel = root.querySelector('.ac-chat-panel');
  const launcher = root.querySelector('.ac-chat-launcher');
  const input = root.querySelector('input');
  const send = root.querySelector('.ac-chat-send');
  const log = root.querySelector('.ac-chat-messages');
  const suggestions = root.querySelector('.ac-chat-suggestions');
  const subtitle = root.querySelector('.ac-chat-subtitle');
  let replyTimer = null;

  function addMessage(text, author, links = []) {
    const message = document.createElement('div');
    message.className = `ac-chat-message ac-chat-message-${author}`;
    const label = document.createElement('span');
    label.className = 'ac-chat-message-label';
    label.textContent = author === 'user' ? 'TE' : 'ANIMACHINA DOKTORA';
    if (author === 'bot') label.insertAdjacentHTML('afterbegin', avatar);
    const bubble = document.createElement('div');
    bubble.className = 'ac-chat-bubble';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    bubble.append(paragraph);
    if (links.length) {
      const list = document.createElement('div');
      list.className = 'ac-chat-sources';
      links.forEach(source => {
        const url = new URL(source.href, document.baseURI);
        if (!['http:', 'https:', 'file:', 'mailto:'].includes(url.protocol)) return;
        const link = document.createElement('a');
        link.href = url.href;
        link.textContent = `${source.label} ↗`;
        if (url.protocol === 'https:' && url.origin !== location.origin) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
        list.append(link);
      });
      bubble.append(list);
    }
    message.append(label, bubble);
    log.append(message);
    while (log.children.length > 60) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
    return message;
  }
  function setTyping(active) {
    root.classList.toggle('ac-chat-is-typing', active);
    subtitle.textContent = active ? 'Éppen gépel…' : 'Az oldal infóiból válaszol';
  }
  function showTyping() {
    const message = addMessage('', 'bot');
    message.classList.add('ac-chat-typing');
    const paragraph = message.querySelector('p');
    paragraph.innerHTML = '<span class="ac-chat-sr">Az Animachina Segítő gépel.</span><span class="ac-chat-typing-dots" aria-hidden="true"><span></span><span></span><span></span></span>';
    setTyping(true);
    log.scrollTop = log.scrollHeight;
    return message;
  }
  function reset() {
    window.clearTimeout(replyTimer);
    replyTimer = null;
    setTyping(false);
    log.replaceChildren();
    previousTopic = '';
    input.value = '';
    send.disabled = true;
    suggestions.hidden = false;
    addMessage('Szia, üdv az Animachinánál! 🎃\n\nSegítek eligazodni a magyarosítások, a csapat és a programok között. Válassz egy témát, vagy írd meg a saját kérdésed!', 'bot');
  }
  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Animachina chatbot bezárása' : 'Animachina chatbot megnyitása');
    document.body.classList.toggle('ac-chat-open', open);
    if (open) { input.focus({ preventScroll: true }); log.scrollTop = log.scrollHeight; }
    else launcher.focus({ preventScroll: true });
  }
  function submit(question) {
    const value = question.trim().slice(0, 500);
    if (!value || replyTimer !== null) return;
    suggestions.hidden = true;
    addMessage(value, 'user');
    const result = answer(value);
    const typing = showTyping();
    input.value = '';
    send.disabled = true;
    input.focus({ preventScroll: true });
    // Rövid, a válasz hosszához igazodó gépelési jelzés.
    const delay = Math.min(1800, 850 + result.text.length * 2);
    replyTimer = window.setTimeout(() => {
      replyTimer = null;
      typing.remove();
      setTyping(false);
      addMessage(result.text, 'bot', result.sources);
      send.disabled = !input.value.trim();
    }, delay);
  }
  ['Hol tölthetem le a magyarosítást?', 'Hogyan csatlakozhatok?', 'Mikor lesz a koncert?', 'Miben tudsz segíteni?'].forEach(question => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = question;
    button.addEventListener('click', () => submit(question));
    suggestions.append(button);
  });
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  root.querySelector('#ac-chat-close').addEventListener('click', () => setOpen(false));
  root.querySelector('#ac-chat-reset').addEventListener('click', () => { reset(); input.focus(); });
  root.querySelector('form').addEventListener('submit', event => { event.preventDefault(); submit(input.value); });
  input.addEventListener('input', () => { send.disabled = replyTimer !== null || !input.value.trim(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { setOpen(false); event.preventDefault(); } });
  reset();

  // A főlap szövege azonnal frissül a megjelenített tartalomból.
  document.querySelectorAll('#about p, #careers p, #news .press-content').forEach(element => {
    const section = element.closest('section');
    const text = element.textContent.replace(/\s+/g, ' ').trim();
    if (text) passages.unshift({ title: section.querySelector('h2')?.textContent || 'Főlap', text, url: `index.html#${section.id}` });
  });
})();
