// frontend/public/widget.js
(function () {
  // Get agentId from script tag
  const script = document.currentScript;
  const agentId = script.getAttribute('data-agent-id');

  if (!agentId) {
    console.error('AI Estate Dubai: Missing data-agent-id');
    return;
  }

  // Create iframe to load the widget
  const iframe = document.createElement('iframe');
  // const widgetUrl = `https://aiestatedubai.com/widget?agentId=${agentId}`;
  const widgetUrl = `https://aiestatedubai.com/widget?agentId=${agentId}&mode=embed`;

  
  iframe.src = widgetUrl;
  iframe.style = 'position:fixed; bottom:0; right:0; width:100vw; height:100vh; border:none; margin:0; padding:0; overflow:hidden; z-index:999999; pointer-events:none;';
  iframe.allowTransparency = 'true';
  
  iframe.onload = () => {
    iframe.style.pointerEvents = 'auto';
  };

  document.body.appendChild(iframe);
})();