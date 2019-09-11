$(document).ready(function(){
 
   $('#button').click(function(){
     $('#txt1').val("js works!");
   });
  
  var cimChatIds = { chatIds: 'o3gaPVChkdyfiDgwGYvnNxj1Qwrtrp6i, VMJZCCTIjNopGfx5tUQFcRj1Qwrtrp6i' };
  
  
  setTimeout(function () {
    cm_InitiateChatStatus(cimChatIds, 'https://chattest.ecmr.biz/ChatClient/StatusIndex');
  }, 5000);
  
  setTimeout(function () {
    cm_StatusByChatIds(cimChatIds);
  }, 8000);

  document.addEventListener("cmStatusByChatIdsUpdated", function (event) {
    cimWidgetsStatusByChatIdsUpdated(event);
  });
  
  
  cimWidgetsStatusByChatIdsUpdated = function(event) {
    object = event.detail; 
    if (object) {
        object.forEach(cimWidgetsChatStatusHandler);
    }
  };

  cimWidgetsChatStatusHandler = function(item, index, arr) {
    var object = arr[index];
    var id = object.id;
    var status = object.status;
    var statusText = object.statusText;
    var btnId = '.'+id;
    // Set status text
    if ($(btnId)[0]) {
      $(btnId).html(status);
      $(btnId).attr('data-chat-status', status);
      return;
    }
    // Create status button
    $('.status-buttons').append('<span class="chat-status ' + id + '" data-chat-status="' + status + '">' + status + '</span');
    // Add click handler
    $( btnId ).on('click', {id: id}, handleChatBtnClick);
  };
  
  handleChatBtnClick = function(event) {
    var id = event.data.id,
        btnId = '.'+id,
        status = $(btnId).attr('data-chat-status');
    console.log(status)
    if (status === 'Ready') {
      cm_InitiateChatClient(id, 'https://chattest.ecmr.biz/ChatClient/Index');
      $('.iframeWrapper .cm-Chat-container').show(); 
    }
    
    
  };
});