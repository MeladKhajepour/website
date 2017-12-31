(function() {
  document.onreadystatechange = function () {
    if (document.readyState === "interactive") {

    var name = document.getElementById("name");
    var list = document.getElementById("list");
    var listBtns = document.querySelectorAll('#list>ul a li');
    var fader = document.querySelector("#landing .fader");
    var tools = document.querySelector("#tools-banner .fader");
    var scrollable = false;
    var fixed = false;
    var scrollUp;
    var scrollPt;
    var toolsPosn;
    var oldScroll;
    var handlers = {
      onResize: function(ev) {

      },
      onLoad: function(ev) {
        listBtns.forEach(function(btn) {
          btn.onclick = function() {
            listBtns.forEach(function(btn) {
              if(btn.classList.contains("selected")) {
                btn.classList.remove("selected");
              }
            });
            this.classList.add("selected");
          };
        });
      },
      onScroll: function() {
        scrollPt = window.pageYOffset;
        toolsPosn = tools.getBoundingClientRect();
        scrollUp = oldScroll > scrollPt;
        oldScroll = scrollPt;

        //Adjusts the navbar behaviour
        if(scrollPt >= 300 && (!scrollable || !fixed)) {
          scrollable = true;
          name.classList.add("scrollable");
          list.classList.add("scrollable-transition");

          if(scrollPt >=384 && !fixed) {
            fixed = true;
            list.classList.remove("scrollable-transition");
            list.classList.add("fixed");
          }
        } else if(scrollPt < 384 && scrollPt >= 300 && fixed) {
          fixed = false;
          list.classList.remove("fixed");
          list.classList.add("scrollable-transition");
        } else if(scrollPt < 300 && scrollable) {
          hasClass = false;
          name.classList.remove("scrollable");
          list.classList.remove("fixed", "scrollable-transition");
        }

        //Adjusts the navbar opacity
        if(scrollPt > 100) {
          name.classList.add("filled");
          list.classList.add("filled");
        } else {
          name.classList.remove("filled");
          list.classList.remove("filled");
        }

        //Expands and contracts nav buttons based on scroll direction
        listBtns.forEach(function(btn) {
          if(scrollUp) {
            btn.classList.add("expanded");
          } else if(!scrollUp) {
            btn.classList.remove("expanded");
          }
        });

        //Fades the landing image as user scrolls down page
        if(scrollPt > fader.clientHeight / 3) {
          fader.style.opacity = ( scrollPt - fader.clientHeight / 3 ) / (fader.clientHeight / 2.5);
        } else {
          fader.style.opacity = 0;
        }

        //Fades tool section after 50px over 250px
        if(toolsPosn.top < window.innerHeight) {
          tools.style.opacity = 1 - (window.innerHeight - toolsPosn.top - 50) / 250;
        }
      }
    }
    window.onload = handlers.onLoad;
    window.onresize = handlers.onResize;
    window.onscroll = handlers.onScroll;

    }
  }
}())
