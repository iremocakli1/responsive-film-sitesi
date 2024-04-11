function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function increaseFontSize() {
  var content = document.querySelector(".summary p");
  var currentSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
  var newSize = parseFloat(currentSize) * 1.2;
  if (newSize <= 30) { // Üst sınırı burada 30 piksel olarak belirledik
      content.style.fontSize = newSize + 'px';
  }
}

function decreaseFontSize() {
  var content = document.querySelector(".summary p");
  var currentSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
  var newSize = parseFloat(currentSize) * 0.8;
  if (newSize >= 10) { // Alt sınırı burada 10 piksel olarak belirledik
      content.style.fontSize = newSize + 'px';
  }
}
// Örnek resim URL'leri
const imageUrls = [
  "https://via.placeholder.com/800x200?text=Image+1",
  "https://via.placeholder.com/800x200?text=Image+2",
  "https://via.placeholder.com/800x200?text=Image+3"
];

// Carousel elementlerini seç
const carouselIndicators = document.querySelector(".carousel-indicators");
const carouselInner = document.querySelector(".carousel-inner");

// Carousel'a resimleri ekle
imageUrls.forEach((url, index) => {
  // Indicator oluştur
  const indicator = document.createElement("li");
  indicator.setAttribute("data-target", "#carouselExampleIndicators");
  indicator.setAttribute("data-slide-to", index.toString());
  if (index === 0) {
    indicator.classList.add("active");
  }
  carouselIndicators.appendChild(indicator);

  // Carousel içine resim ekle
  const item = document.createElement("div");
  item.classList.add("carousel-item");
  if (index === 0) {
    item.classList.add("active");
  }
  const image = document.createElement("img");
  image.classList.add("d-block", "w-100");
  image.src = url;
  item.appendChild(image);
  carouselInner.appendChild(item);
});






function toggleDropdown(dropdownId) {
  var dropdownContent = document.getElementById(dropdownId + "-content");
  dropdownContent.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

/**
 * @description Change Home page slider's arrows active status
 */
function updateSliderArrowsStatus(
  cardsContainer,
  containerWidth,
  cardCount,
  cardWidth
) {
  if (
    $(cardsContainer).scrollLeft() + containerWidth <
    cardCount * cardWidth + 15
  ) {
    $("#slide-right-container").addClass("active");
  } else {
    $("#slide-right-container").removeClass("active");
  }
  if ($(cardsContainer).scrollLeft() > 0) {
    $("#slide-left-container").addClass("active");
  } else {
    $("#slide-left-container").removeClass("active");
  }
}
$(function() {
  // Scroll products' slider left/right
  let div = $("#cards-container");
  let cardCount = $(div)
    .find(".cards")
    .children(".card").length;
  let speed = 1000;
  let containerWidth = $(".container").width();
  let cardWidth = 250;

  updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);

  //Remove scrollbars
  $("#slide-right-container").click(function(e) {
    if ($(div).scrollLeft() + containerWidth < cardCount * cardWidth) {
      $(div).animate(
        {
          scrollLeft: $(div).scrollLeft() + cardWidth
        },
        {
          duration: speed,
          complete: function() {
            setTimeout(
              updateSliderArrowsStatus(
                div,
                containerWidth,
                cardCount,
                cardWidth
              ),
              1005
            );
          }
        }
      );
    }
    updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
  });
  $("#slide-left-container").click(function(e) {
    if ($(div).scrollLeft() + containerWidth > containerWidth) {
      $(div).animate(
        {
          scrollLeft: "-=" + cardWidth
        },
        {
          duration: speed,
          complete: function() {
            setTimeout(
              updateSliderArrowsStatus(
                div,
                containerWidth,
                cardCount,
                cardWidth
              ),
              1005
            );
          }
        }
      );
    }
    updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
  });

  // If resize action ocurred then update the container width value
  $(window).resize(function() {
    try {
      containerWidth = $("#cards-container").width();
      updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
    } catch (error) {
      console.log(
        `Error occured while trying to get updated slider container width: 
            ${error}`
      );
    }
  });
});



