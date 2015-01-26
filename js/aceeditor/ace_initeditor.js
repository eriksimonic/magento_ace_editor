jQuery(function(){
    jQuery('textarea').each(function(index,obj){
        var $obj = jQuery(obj);
        var $button = jQuery('<button >Edit in ace editor</button>');
        var $editor_id  = 'aceedit'+index;

        $button.data('linkededitor' , obj);
        $button.data('editorid'     ,$editor_id);
        $button.on('click',function(e){
            e.preventDefault();
            var $button = jQuery(this);
                var $editor = jQuery('#' + $button.data('editorid'));
                var $text_area = jQuery($button.data('linkededitor'));
                if ($editor.length == 0) {
                    $editor = jQuery('<div id="' + $button.data('editorid') + '"></div>');
                    $editor.css({
                        'width': '100%',
                        'height': '300px'
                    });
                }
                $text_area.before($editor);
                $editor.text($text_area.val());
                var editor = ace.edit(jQuery(this).data('editorid'));
                editor.setTheme("ace/theme/xcode");
                editor.getSession().setMode("ace/mode/xml");
                editor.on('change',function(e){
                    $text_area.val(editor.getValue());
                });
                var $button_stop_editing = jQuery('<button>',{
                    'text':'Exit ace editor'
                });
                $button_stop_editing.data('ace',editor);
                $button_stop_editing.data('button',$button);
                $button_stop_editing.data('textarea',$text_area);
                $button.after($button_stop_editing);
                $button_stop_editing.on('click',function(event){
                    event.preventDefault();
                    var $this = jQuery(this);
                    var editor    =   $this.data('ace');
                    var button    =   $this.data('button');
                    var textarea  =   $this.data('textarea');
                    textarea.val(editor.getValue());
                    editor.destroy();
                    textarea.show();
                    button.show();
                    jQuery('#'+button.data('editorid')).remove();
                    $this.off();
                    $this.remove();
                });
                $text_area.hide();
                $button.hide();
        })
        $obj.before($button);
    });
});
