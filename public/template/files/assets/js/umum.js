$(document).ready(function() {
    $('[data-toggle="tooltip"]').click(function() {
        $('[data-toggle="tooltip"]').tooltip("hide");

    });
});


function toolBarInquery() {
    var a = document.getElementById("btnInq").className;
    var position = a.search("_disabled");
    if (position > 0) {
        alert("You Dont Have Acces !!");
    } else {
        fnInquery();
    }

}


function downloadExcell(idxHeader,dataTable){

    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    };

    idxHeader=idxHeader.replace("#","");
    var header = document.getElementById(idxHeader).innerHTML;

    header = "<table border='1' > <tr bgcolor='#2dcee3' >" + header + "</tr>";
    htmls = header + dataTable+"</table>";
    //console.log(htmls);

    var ctx = {
        worksheet: 'Worksheet',
        table: htmls
    }


    var link = document.createElement("a");
    link.download = "export.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();

}

function openAllGrid(idxDataTable,idxCard,tableId,dataTable){
    var table = $(idxDataTable).DataTable();
    var screenHeight = $(document).height();
    screenHeight = screenHeight * 70 / 100;
    alert(screenHeight);
    $(idxCard).height(screenHeight);
    $(idxCard).css("overflow", "auto");
    table.destroy();
    $(tableId).html(dataTable);
}

function minimizeAllGrid(idxDataTable,tableId,dataTable){

    var table = $(idxDataTable).DataTable();
    table.destroy();
    $(tableId).html(dataTable);
    $(idxDataTable).DataTable({
        fixedHeader: true
    });
}


function toolBarNew() {
    var a = document.getElementById("btnNew").className;
    var position = a.search("_disabled");
    if (position > 0) {
        alert("You Dont Have Acces !!");
    } else {
        fnNew();
    }
}

function toolBarSave() {
    var a = document.getElementById("btnSave").className;
    var position = a.search("_disabled");
    if (position > 0) {
        alert("You Dont Have Acces !!");
    } else {
        fnSave();
    }
}

function toolBarDelete() {
    var a = document.getElementById("btnDelete").className;
    var position = a.search("_disabled");
    if (position > 0) {
        alert("You Dont Have Acces !!");
    } else {
        fnDelete();
    }
}

function toolBarPrint() {
    var a = document.getElementById("btnPrint").className;
    var position = a.search("_disabled");
    if (position > 0) {
        alert("You Dont Have Acces !!");
    } else {
        fnPrint();
    }
}




function changeMenu(menus, title, menuid) {
    document.getElementById("menuTitle").innerHTML = title;
    $(".main-body").load(menus, function() {
        //alert(menus);
        setDefault(menuid);
        
    });
    return false;

}

function startLoading(){
    $('#loadingModal').modal('show');
}
function finishLoading(){
    $('#loadingModal').modal('hide');
}

function Logout() {
    document.location.href = "/view/eas/jsp/general/logout.jsp";
}

function errorLabel(sts) {
    if (sts == "SHOW") {
        $("#errorLabel").show().delay(3000).fadeOut();
    } else {
        $("#errorLabel").hide(1000);
    }

}

function changeColor(e, idxTable) {
    $(idxTable + ' tr').css("color", "black");
    $(idxTable + ' tr').css("background-color", "");
    $(e).css("cursor", "pointer");
    $(e).css("background-color", "#6e6e6e");
    $(e).css("color", "white");

}

function clickRow(e, idx) {
    $(idx + ' tr').css("background-color", "");
    $(idx + ' tr').css("color", "black");
    $(e).css("background-color", "#6e6e6e");
    $(e).css("color", "white");
    $(e).css("font-wiegth", "bold");
}

function backColor() {
    //$('#tableResult tr').css("color", "black");
}

function menuPrevileges() {
    $.get("/view/eas/jsp/general/menu.html", {
            tipe: "SELECT",
            userId: ""
        },
        function(data, status) {
            //console.log(data);
            //alert("Data: " + data + "\nStatus: " + status);
            //const myArr = JSON.parse(data);
            document.getElementById("menuId").innerHTML = data;
            $("#pcoded").pcodedmenu({
                    themelayout: "vertical",
                    verticalMenuplacement: "left",
                    verticalMenulayout: "wide",
                    MenuTrigger: "click",
                    SubMenuTrigger: "click",
                    activeMenuClass: "active",
                    ThemeBackgroundPattern: "pattern4",
                    HeaderBackground: "theme1",
                    LHeaderBackground: "theme1",
                    NavbarBackground: "theme1",
                    ActiveItemBackground: "theme1",
                    SubItemBackground: "theme2",
                    ActiveItemStyle: "style0",
                    ItemBorder: !0,
                    ItemBorderStyle: "none",
                    SubItemBorder: !0,
                    DropDownIconStyle: "style1",
                    menutype: "st6",
                    freamtype: "theme1",
                    layouttype: "light",
                    FixedNavbarPosition: !0,
                    FixedHeaderPosition: !0,
                    collapseVerticalLeftHeader: !0,
                    VerticalSubMenuItemIconStyle: "style1",
                    VerticalNavigationView: "view1",
                    verticalMenueffect: {
                        desktop: "shrink",
                        tablet: "overlay",
                        phone: "overlay"
                    },
                    defaultVerticalMenu: {
                        desktop: "expanded",
                        tablet: "offcanvas",
                        phone: "offcanvas"
                    },
                    onToggleVerticalMenu: {
                        desktop: "offcanvas",
                        tablet: "expanded",
                        phone: "expanded"
                    }
                }),
                function() {
                    $(".theme-color > a.fream-type").on("click", function() {
                        var e = $(this).attr("fream-type");
                        $(".pcoded").attr("fream-type", e), $(".pcoded-header").attr("header-theme", "themelight" + e), $(".pcoded-navbar").attr("navbar-theme", "theme" + e), $(".navbar-logo").attr("logo-theme", "theme" + e)
                    })
                }(),
                function() {
                    $(".theme-color > a.Layout-type").on("click", function() {
                        var e = $(this).attr("layout-type");
                        $(".pcoded").attr("layout-type", e), "dark" == e && ($(".pcoded-header").attr("header-theme", "theme6"), $(".pcoded-navbar").attr("navbar-theme", "theme1"), $(".navbar-logo").attr("logo-theme", "theme6"), $("body").addClass("dark")), "light" == e && ($(".pcoded-header").attr("header-theme", "theme1"), $(".pcoded-navbar").attr("navbar-theme", "themelight1"), $(".navbar-logo").attr("logo-theme", "theme1"), $("body").removeClass("dark"))
                    })
                }(),
                function() {
                    $(".theme-color > a.logo-theme").on("click", function() {
                        var e = $(this).attr("logo-theme");
                        $(".navbar-logo").attr("logo-theme", e)
                    })
                }(),
                function() {
                    $(".theme-color > a.leftheader-theme").on("click", function() {
                        var e = $(this).attr("lheader-theme");
                        $(".pcoded-navigatio-lavel").attr("menu-title-theme", e)
                    })
                }(),
                function() {
                    $(".theme-color > a.header-theme").on("click", function() {
                        var e = $(this).attr("header-theme");
                        $(".pcoded-header").attr("header-theme", e), $(".navbar-logo").attr("logo-theme", e)
                    })
                }(),
                function() {
                    $(".theme-color > a.navbar-theme").on("click", function() {
                        var e = $(this).attr("navbar-theme");
                        $(".pcoded-navbar").attr("navbar-theme", e)
                    })
                }(),
                function() {
                    $(".theme-color > a.active-item-theme").on("click", function() {
                        var e = $(this).attr("active-item-theme");
                        $(".pcoded-navbar").attr("active-item-theme", e)
                    })
                }(),
                function() {
                    $(".theme-color > a.sub-item-theme").on("click", function() {
                        var e = $(this).attr("sub-item-theme");
                        $(".pcoded-navbar").attr("sub-item-theme", e)
                    })
                }(),
                function() {
                    $(".theme-color > a.themebg-pattern").on("click", function() {
                        var e = $(this).attr("themebg-pattern");
                        $("body").attr("themebg-pattern", e)
                    })
                }(),
                function() {
                    $("#navigation-view").val("view1").on("change", function(e) {
                        e = $(this).val(), $(".pcoded").attr("vnavigation-view", e)
                    })
                }(),
                function() {
                    $("#theme-layout").change(function() {
                        $(this).is(":checked") ? ($(".pcoded").attr("vertical-layout", "box"), $("#bg-pattern-visiblity").removeClass("d-none")) : ($(".pcoded").attr("vertical-layout", "wide"), $("#bg-pattern-visiblity").addClass("d-none"))
                    })
                }(),
                function() {
                    $("#vertical-menu-effect").val("shrink").on("change", function(e) {
                        e = $(this).val(), $(".pcoded").attr("vertical-effect", e)
                    })
                }(),
                function() {
                    $("#vertical-navbar-placement").val("left").on("change", function(e) {
                        e = $(this).val(), $(".pcoded").attr("vertical-placement", e), $(".pcoded-navbar").attr("pcoded-navbar-position", "absolute"), $(".pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "relative")
                    })
                }(),
                function() {
                    $("#vertical-activeitem-style").val("style1").on("change", function(e) {
                        e = $(this).val(), $(".pcoded-navbar").attr("active-item-style", e)
                    })
                }(),
                function() {
                    $("#vertical-item-border").change(function() {
                        $(this).is(":checked") ? $(".pcoded-navbar .pcoded-item").attr("item-border", "false") : $(".pcoded-navbar .pcoded-item").attr("item-border", "true")
                    })
                }(),
                function() {
                    $("#vertical-subitem-border").change(function() {
                        $(this).is(":checked") ? $(".pcoded-navbar .pcoded-item").attr("subitem-border", "false") : $(".pcoded-navbar .pcoded-item").attr("subitem-border", "true")
                    })
                }(),
                function() {
                    $("#vertical-border-style").val("solid").on("change", function(e) {
                        e = $(this).val(), $(".pcoded-navbar .pcoded-item").attr("item-border-style", e)
                    })
                }(),
                function() {
                    $("#vertical-dropdown-icon").val("style1").on("change", function(e) {
                        e = $(this).val(), $(".pcoded-navbar .pcoded-hasmenu").attr("dropdown-icon", e)
                    })
                }(),
                function() {
                    $("#vertical-subitem-icon").val("style5").on("change", function(e) {
                        e = $(this).val(), $(".pcoded-navbar .pcoded-hasmenu").attr("subitem-icon", e)
                    })
                }(),
                function() {
                    $("#sidebar-position").change(function() {
                        $(this).is(":checked") ? ($(".pcoded-navbar").attr("pcoded-navbar-position", "fixed"), $(".pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "fixed")) : ($(".pcoded-navbar").attr("pcoded-navbar-position", "absolute"), $(".pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "relative"))
                    })
                }(),
                function() {
                    $("#header-position").change(function() {
                        $(this).is(":checked") ? ($(".pcoded-header").attr("pcoded-header-position", "fixed"), $(".pcoded-navbar").attr("pcoded-header-position", "fixed"), $(".pcoded-main-container").css("margin-top", $(".pcoded-header").outerHeight())) : ($(".pcoded-header").attr("pcoded-header-position", "relative"), $(".pcoded-navbar").attr("pcoded-header-position", "relative"), $(".pcoded-main-container").css("margin-top", "0px"))
                    })
                }(),
                function() {
                    $("#collapse-left-header").change(function() {
                        $(this).is(":checked") ? ($(".pcoded-header, .pcoded ").removeClass("iscollapsed"), $(".pcoded-header, .pcoded").addClass("nocollapsed")) : ($(".pcoded-header, .pcoded").addClass("iscollapsed"), $(".pcoded-header, .pcoded").removeClass("nocollapsed"))
                    })
                }()
        });

}