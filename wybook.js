//vars
var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");
var browser = navigator.userAgent.toLowerCase();
var isMobile = false;
for (var i = 0; i < mobileAgent.length; i++) {
    if (browser.indexOf(mobileAgent[i]) != -1) {
        isMobile = true;
        break;
    }
}

var inx = 0;
var sapd = 55;


$(document).ready(function () {
    var sst = "<style>" + "#cd form.sl{clear:both;width:auto;height:auto;border:none;margin:0;float:none;padding:0;}\n" + "#cd button{width:100px;}\n" + "#cd input{width:200px;}\n" + ".item{background-color:#eee;}\n" + ".item span{font-size:16px;font-weight:bold;}\n" + ".clr{clear:right;}\n" + "</style>";
    $("body").append($(sst));

    //$("<div></div>").attr("class","clear").appendTo($("#cd"));

    /*$("<div></div>").attr("class","clear")
         .append($("<input />").attr("id","gtxt").attr("type","text")).appendTo($("#cd"))
         .append($("<button />").text("Go").click(function(){document.location="http://"+$("#gtxt").val();})).appendTo($("#cd"))
         .appendTo($("#cd"))
         .focus()
         ;
         */
    $("<form></form>").attr("action", "g.html").appendTo($("#cd"))
        .append($("<input />").attr("id", "q").attr("name", "q").attr("type", "text"))
        .append($("<button />").attr("type", "submit").text("Search"))
        .appendTo($("#cd"));
    //$("#q")[0].focus();


    //$("<div></div>").attr("class", "clear").appendTo($("#cd"));


    sapd = ($(window).height() - 100) / 6;

    procBr();
    procSub();
    setLinks();
    procBr();

    $("button").each(function () {
        $(this).addClass("col-xs-3").addClass("col-sm-3").addClass("col-md-1").addClass("item");
    });
});

function procBr() {
    $("br").each(function () {
        //$(this).replaceWith("</div><div class=\"row\">");
        $(this).replaceWith("<a class=\"sp\" href=\"./\"></a>");
    });

    $("a.sp").each(function () {
        $(this).css("background-color", "#ddd").css("border-top", "solid 2px #ddd");
    });
}

function procSub() {
    $("a.subs").each(function () {
        $(this).removeAttr('href').click(function () {
            var h = eval($(this).attr("data-subs"));
            $($("div.container > div.row").get(1)).html("<a href=\"" + document.location.href + "\">[BACK]</a><br/>" + h);
            procBr();
            setLinks();
            procBr();
        }).attr("href", "#" + (new Date()));
    });
}

function setLinks() {
    //$("div.panel").css("border-top","solid 1px #333");
    inx = 0;
    $("a.subs > span").each(function () {
        var ss = $(this).html();
        // console.warn(fullrep(ss,"p>","a>"));
        ss = fullrep(ss, "p>", "a>");
        ss = fullrep(ss, "<p ", "<a ");
        $(this).parent().attr("data-subs", JSON.stringify(ss));
        // console.warn($(this).parent());

        $(this).remove();
    });
    inx = 0;

    $("a","div.row").each(function () {

        inx++;

        var chkobj = $(this);
        var shref, sttf;

        if (chkobj.attr("href") == null) {
            shref = chkobj.text();
            sttf = shref;
            if (shref.substring(0, 4) != "http") {
                shref = "http://" + shref;
            }
            chkobj.attr("href", shref);

            sttf = sttf.replace("https://", "").replace("http://", "").replace("www.", "") + '.';
            sttf = sttf.replace(/\//ig, '.');

            sttf = "<span>" + sttf.replace(".", "</span>.");
            sttf = sttf.replace(/\./ig, '<span style="clear:both;width:1px;height:1px;"></span>');

            chkobj.html(sttf);
        }

        chkobj.attr("id", "link" + inx).addClass("col-xs-3").addClass("col-sm-3").addClass("col-md-1").addClass("item");

        if (inx % 2 == 0) {
            chkobj.css("background-color", "#eee").css("border-top", "solid 2px #ddd");
        } else {
            chkobj.css("background-color", "#ddd").css("border-top", "solid 2px #eee");
        }

        if (isMobile) {
            if (chkobj.attr("murl") !== undefined) {
                chkobj.attr("href", chkobj.attr("murl"));
            }
        }

        //$(".row").length
        chkobj.height(sapd); //.width(sapd).css("border-right","solid 1px #333").css("border-bottom","solid 1px #333");
        //        $(this).css("padding","3 3 3 3").css("margin","0 5 5 0").width($(this).width()-7);//.css("padding","3 0 0 3");

        /*$(this).hover(function () {
                $(this).css("background-color", "#ccc");
            }, function () {
                $(this).css("background-color", "#eee");
            })
            ;*/
    });
}

function fullrep(sour, find, rep) {
    var dd = sour;
    while (dd.indexOf(find) !== -1) dd = dd.replace(find, rep);

    return dd;
}