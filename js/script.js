(function() {
  var winHeight = window.innerHeight;

  document.onreadystatechange = function () {
    if (document.readyState === "interactive") {

      var name = document.getElementById("name");
      var list = document.getElementById("list");
      var listBtns = document.querySelectorAll('#list>ul a li');
      var landing = document.querySelector("#landing .fader");
      var tools = document.querySelector("#tools .banner .fader");
      var hobbies = document.querySelector("#hobbies .banner .fader");
      var scrollable = false;
      var fixed = false;
      var scrollUp;
      var scrollPt;
      var toolsPosn;
      var oldScroll;
      var handlers = {
      onResize: function(ev) {
        winHeight = window.innerHeight;
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
      onScroll: function(ev) {
        scrollPt = window.pageYOffset;
        //toolsPosn = tools.getBoundingClientRect();
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

        fadeLanding(landing);
        fade(tools);
        fade(hobbies);
      }
    }
    window.onload = handlers.onLoad;
    window.onresize = handlers.onResize;
    window.onscroll = handlers.onScroll;

    }
  }

  //Fades landing after 1/3 window height over 1/3 window height
  var fadeLanding = function(landing) {
    var posn = landing.getBoundingClientRect().bottom;

    if(posn <= 2 * winHeight / 3 && posn > (winHeight / 3)) {
      landing.style.opacity = (2 * winHeight / 3 - posn) / (winHeight / 3);
    } else if (posn > 2 * winHeight / 3) {
      landing.style.opacity = 0;
    } else {
      landing.style.opacity = 1;
    }
  }

  //Fades el after 50px over 250px
  var fade = function(el) {
    var posn = el.getBoundingClientRect().top;

    if(posn <= winHeight && posn > winHeight - 250) {
      el.style.opacity = 1 - (winHeight - posn - 50) / 250;
    }
  }
}())
