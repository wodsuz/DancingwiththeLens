'use strict';

var anchors = [].slice.call(document.querySelector(".anchors").firstElementChild.children);
var listeners = ['init', 'update', 'scroll.before', 'scroll.start', 'scroll', 'scroll.end'];
var list = document.getElementById("listeners");
var toggle = document.getElementById("settings-open");
var settings = document.getElementById("settings");
var inputs = document.querySelectorAll("input");
var buttons = document.querySelectorAll("button");
var selects = document.querySelectorAll("select");

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {showSlides(slideIndex += n)}
function currentSlide(n) {showSlides(slideIndex = n)}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
	  dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

var modal = document.getElementById("myModal");
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");

var allimages = document.querySelectorAll(".img-responsive")
allimages.forEach(function (image) {
	image.addEventListener('click',function() {
		modal.style.display = "block";
		modalImg.src = this.src;
	})
});

// When the user clicks on <span> (x), close the modal
modal.onclick = function() { modal.style.display = "none"}

function lansel(lan) {
	var mydata = "";
	if (lan=="en") mydata = data_en;
	if (lan=="pl") mydata = data_pl;
	if (lan=="de") mydata = data_de;
	if (lan=="it") mydata = data_it;
	if (lan=="tr") mydata = data_tr;
	if (true) {
		document.getElementById("hometab").innerHTML  = mydata[0]
		document.getElementById("abouttab").innerHTML  = mydata[1]
		document.getElementById("Aboutme_Text").innerHTML  = mydata[1]
		document.getElementById("portfoltab").innerHTML  = mydata[2]
		document.getElementById("portfoliohead").innerHTML  = mydata[2]
		document.getElementById("contacttab").innerHTML  = mydata[3]
		document.getElementById("contacthead").innerHTML = mydata[3]
		document.getElementById("scrollhint").innerHTML  = mydata[4]
		document.getElementById("Kasiaprotext").innerHTML  = mydata[5]
		document.getElementById("yournametxt").innerHTML  = mydata[8]
		document.getElementById("namefield").placeholder = mydata[9]
		document.getElementById("youremailtxt").innerHTML = mydata[10]
		document.getElementById("email").placeholder = mydata[11]
		document.getElementById("messagtxt").innerHTML = mydata[12]
		document.getElementById("message").placeholder = mydata[13]
		document.getElementById("submitbtn").innerHTML = mydata[14]
		document.getElementById("portinst").innerHTML = '<i class="bi-instagram" aria-hidden="true"></i>' + " " +mydata[15];
		document.getElementById("perinst").innerHTML = '<i class="bi-instagram" aria-hidden="true"></i>' + " " +mydata[16];
		document.getElementById("primail").innerHTML = '<i class="bi-envelope-fill" aria-hidden="true"></i>' + " " +mydata[17];
		document.getElementById("copyrightlabel").innerHTML = mydata[18] + " " +'<i class="bi-heart" aria-hidden="true"></i><br>' + " " +mydata[19];

	}
}
lansel("en");

function quotesel() {
	var quote_len = ["“Photography is the story I fail to put into words.”",
	"“When words become unclear, I shall focus with photographs. When images become inadequate, I shall be content with silence.”",
	"“In photography there is a reality so subtle that it becomes more real than reality.”",
	"“There is one thing the photograph must contain, the humanity of the moment.”",
	"“We are making photographs to understand what our lives mean to us.”",
	"“A thing that you see in my pictures is that I was not afraid to fall in love with these people.”",
	"“Which of my photographs is my favorite? The one I’m going to take tomorrow.”",
	"“A portrait is not made in the camera but on either side of it.”",
	"“The best thing about a picture is that it never changes, even when the people in it do.”",
	"“Essentially what photography is is life lit up.”",
	"“I really believe there are things nobody would see if I didn’t photograph them.”",
	"“Taking pictures is savoring life intensely, every hundredth of a second.”",
	]
	var quo_aut = [" — Destin Sparks" , "— Ansel Adams" , " — Alfred Stieglitz" ,
				 " — Robert Frank" , " — Ralph Hattersley" , " — Annie Leibovitz", "— Imogen Cunningham",
				" — Edward Steichen", " — Andy Warhol", " — Sam Abell", " — Diane Arbus" , " — Marc Riboud"
	]
	var randomnum = Math.floor(Math.random() * quote_len.length); 
	document.getElementById("p1").innerHTML = quote_len[randomnum];
	document.getElementById("p2").innerHTML = quo_aut[randomnum];
}
window.onload = quotesel();
var pageable = new Pageable("main", {
	animation: 300,
	onInit: init,
	onFinish: update,
	events: {
		mouse: false
	},
	delay: 300,
	onBeforeStart: function() {
		this.pages.forEach((page, i) => {
			page.classList.remove("pg-active");
		});	
	}	
});

function update(data) {
	var that = this;
	selects[0].value = this.index + 1;
	selects[1].value = this.anchors[this.index];
	selects[2].value = this.horizontal ? "horizontal" : "vertical";

	document.getElementById("wheel").checked = this.events.wheel;
	document.getElementById("mouse").checked = this.events.mouse;
	document.getElementById("touch").checked = this.events.touch;
	document.getElementById("keydown").checked = this.events.keydown;
	document.getElementById("freescroll").checked = this.config.freeScroll;

	anchors.forEach(function (anchor, i) {
		anchor.firstElementChild.classList.toggle("active", i === that.index);
	});
}

function init() {
	
	var that = this;
	
	listeners.forEach(function (listener) {
		var item = document.createElement("li");
		item.textContent = listener;
		list.appendChild(item);

		that.on(listener, function (data) {

			item.classList.add("active");

			setTimeout(function () {
				item.classList.remove("active");
			}, 200);

			if (listener === "scroll.end") {
				setTimeout(function () {
					Array.from(list.children).forEach(function (child) {
						return child.classList.remove("active");
					});
				}, 400);
			}
		});
	});	

	window.bar = new MiniBar('#scroll', {
		alwaysShowBars: true
	});	
	
	toggle.addEventListener("click", function (e) {
		settings.classList.toggle("active");
	});
	
	buttons.forEach(function (button) {
		button.onclick = toggleMethod;
	});
	
	inputs.forEach(function (input) {
		if (input.type === "checkbox") {
			if (input.id === "freescroll") {
				input.onchange = function (e) {
					that.config.freeScroll = input.checked;
					that.events.mouse = input.checked;
					document.getElementById("mouse").checked = input.checked;
				};
			} else if (input.id === "infinite") {
				input.onchange = function (e) {
					that._toggleInfinite(!input.checked);
				};
			} else {
				input.onchange = toggleEvent;
			}
		} else {
			var output = input.previousElementSibling.lastElementChild;
	
			var config = {
				tooltips: false,
				min: 0,
				step: 100,
				onInit: function onInit(val) {
					output.textContent = val + 'ms';
				},
				onChange: function onChange(val) {
					output.textContent = val + 'ms';
				}
			};
	
			switch (input.id) {
				case "animation":
					config.max = 2000;
					config.value = that.config.animation;
					config.onEnd = function (val) {
						that.config.animation = parseInt(val, 10);
					};
					break;
				case "delay":
					config.max = 1000;
					config.value = that.config.delay;
					config.onEnd = function (val) {
						that.config.delay = parseInt(val, 10);
					};
					break;
				case "swipeThreshold":
					config.step = 10;
					config.max = 500;
					config.value = that.config.swipeThreshold;
					config.onEnd = function (val) {
						that.config.swipeThreshold = parseInt(val, 10);
					};
					config.onInit = function(val) {
						output.textContent = val + 'px';
					};
					config.onChange = function(val) {
						output.textContent = val + 'px';
					};				
					break;
			}
	
			new Rangeable(input, config);
		}
	});
	
	selects.forEach(function (select) {
		initSelect(select);
	});
	
	function toggleMethod(e) {
		if ("method" in this.dataset) {
			that[this.dataset.method]();
		}
	}
	
	function toggleEvent(e) {
		if ("event" in this.dataset) {
			that.events[this.dataset.event] = this.checked;
		}
	}
	
	function initSelect(select) {
		if (select.id === "scrollToPage") {
			that.pages.forEach(function (page, i) {
				var option = new Option(i + 1, i + 1);
				select.add(option);
			});
	
			select.onchange = function (e) {
				that.scrollToPage(e.target.value);
	
				selects[1].value = that.anchors[e.target.value - 1];
			};
		} else if (select.id === "scrollToAnchor") {
			that.pages.forEach(function (page, i) {
				var option = new Option('#' + page.id, '#' + page.id);
				select.add(option);
			});
	
			select.onchange = function (e) {
				that.scrollToAnchor(e.target.value);
	
				selects[0].value = that.anchors.indexOf(e.target.value) + 1;
			};
		} else if (select.id === "orientate") {
	
			["vertical", "horizontal"].forEach(function (type) {
				var option = new Option(type, type);
				select.add(option);
			});
	
			select.onchange = function (e) {
				that.orientate(e.target.value);
			};
		}
	}
}

document.addEventListener("click",function (e){
	if(e.target.classList.contains("gallery-item")){
		  const src = e.target.getAttribute("src");
		  document.querySelector(".modal-img").src = src;
		  const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
		  myModal.show();
	}
  })


  function submitbutton() {
    var namef = (document.getElementById('namefield').value).length;
	var emailf = document.getElementById('email');
	var messagef = (document.getElementById('message').value).length;
	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if(namef>3){
		if (emailf.value.match(validRegex)) {
			if (messagef>50){
				window.alert("Valid")
				
			}
			else window.alert("Please enter a valid message")
			} 
		else window.alert("Please enter a valid email adress")
			
	}
	else window.alert("Please enter a valid name")

	


}