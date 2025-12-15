// (function () {
//   const script = document.currentScript;
//   const agentId = script.getAttribute('data-agent-id');

//   if (!agentId) {
//     console.error('AI Estate Dubai: Missing data-agent-id');
//     return;
//   }

//   const iframe = document.createElement('iframe');
//   iframe.src = `https://aiestatedubai.com/widget?agentId=${agentId}`;
//   iframe.style = 'position: fixed; bottom: 0; right: 0; width: 100vw; height: 100vh; border: none; z-index: 2147483647; pointer-events: none;';
//   iframe.allowTransparency = true;
//   iframe.onload = () => {
//     iframe.style.pointerEvents = 'auto';
//   };
//   document.body.appendChild(iframe);
// })();

// {/* <script src="https://aiestatedubai.com/widget.js" data-agent-id="your-agent-id-here"></script> */}
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
  const widgetUrl = `https://aiestatedubai.com/widget?agentId=${agentId}`;
  
  iframe.src = widgetUrl;
  iframe.style = 'position:fixed; bottom:0; right:0; width:100vw; height:100vh; border:none; margin:0; padding:0; overflow:hidden; z-index:999999; pointer-events:none;';
  iframe.allowTransparency = 'true';
  
  iframe.onload = () => {
    iframe.style.pointerEvents = 'auto';
  };

  document.body.appendChild(iframe);
})();