(function() {
  var winHeight = window.innerHeight;
  var transition = false;
  var fixed = false;
  var scrollUp;
  var scrollPt;
  var oldScroll;

  document.onreadystatechange = function () {
    if (document.readyState === "interactive") {

      var nav = document.getElementById("wrapper-nav");
      var listBtns = document.querySelectorAll('#list>ul a li');
      var portrait = document.getElementById("portrait");
      var landing = document.querySelector("#landing .fader");
      var tools = document.querySelector("#tools .banner .fader");
      var hobbies = document.querySelector("#hobbies .banner .fader");
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
        scrollUp = oldScroll > scrollPt;
        oldScroll = scrollPt;

        if(scrollPt < 650 && transition) {
          transition = false;
          nav.classList.remove("transition");
        } else if(scrollPt >= 650 && scrollPt < 734 && !transition) {
          fixed = false;
          transition = true;
          nav.classList.remove("fixed");
          nav.classList.add("transition");
        } else if(scrollPt >= 734 && !fixed) {
          transition = false;
          fixed = true;
          nav.classList.remove("transition");
          nav.classList.add("fixed");
        }

        if(portrait.getBoundingClientRect().top < listBtns[0].getBoundingClientRect().bottom) {
          nav.classList.add("filled");
        } else {
          nav.classList.remove("filled");
        }

        //Expands and contracts nav buttons based on scroll direction
        if(scrollUp) {
          nav.classList.add("expanded");
        } else {
          nav.classList.remove("expanded");
        }

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
    } else if(posn > winHeight) {
      el.style.opacity = 1;
    } else {
      el.style.opacity = 0;
    }
  }
}())
