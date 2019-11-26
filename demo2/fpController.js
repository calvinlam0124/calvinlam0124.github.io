

/**
includes:
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/vendors/jquery.easings.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/vendors/scrolloverflow.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.js"></script>
<script type="text/javascript" src="fpController.js"></script>

Chrome run:
fpController.init();
fp.Controller.getData("../data2.json");

css:
body{background-color: #eee}
img{hegiht: 100%}
*/

// fp-controller - FullPageJS Controller
(function(obj) {
    obj.init = function(){
        fpController.prepareHtml();
        fpController.render();
    },
    obj.reRresh = function(){
        $.fn.fullpage.destroy('all');
        fpController.render();
    },
    obj.render = function(){
        $('#fullpage').fullpage();
    },
    obj.prepareHtml = function(){
        div = $('<div id="fullpage"></div>');
        $("body").append(div);
        sec = fpController.appendSection(div);
    },
    obj.appendSilde = function(parent){
        slide = $('<div class="slide"></div>');
        $(parent).append(slide);
        return slide;
    },
    obj.appendSection = function(parent){
        section = $('<div class="section"></div>');
        $(parent).append(section);
        return section;
    },
    obj.getLastSection = function(){
        return $("div.section:last");
    },
    obj.dataHandler = function(data){
        $(data).each(function(i,v){
            sec = fpController.getLastSection();
            slide = fpController.appendSilde(sec);
            slide.append("<img src='" + v.login_name + "'>");
        });
        fpController.reRresh();
    },

    obj.getData = function(url){
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            success:fpController.dataHandler
        });
    }
})(this.fpController = {});

