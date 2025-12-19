let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const imageCanvas = document.querySelector("#image-canvas");

const imageInput = document.querySelector("#image-input");

const canvasCtx = imageCanvas.getContext("2d");

const resetButton = document.querySelector("#reset-btn");

const downloadButton=document.querySelector("#download-btn");

const filterContainer = document.querySelector(".filters");

const presetsContainer =document.querySelector(".presets");

let file = null;
let image = null;
const filtersDefaultValues
 = {};

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", function () {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

Object.keys(filters).forEach((key) => {
  const filterElement = createFilterElement(
    key,
    filters[key].unit,
    filters[key].value,
    filters[key].min,
    filters[key].max
  );
  filterContainer.appendChild(filterElement);
  filtersDefaultValues[key] = filters[key].value;
});

imageInput.addEventListener("change", function (e) {
  file = e.target.files[0];

  const imagePlaceholder = document.querySelector(".placeholder");
  imagePlaceholder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = function () {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
  imageCanvas.removeAttribute("hidden");

});

function applyFilters() {
  
  if(!image) return;

  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        `;

  canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", function () {
  Object.keys(filters).forEach((key) => {
    filters[key].value = filtersDefaultValues
[key];
    filterElement = document.getElementById(key);
    filterElement.value = filters[key].value;
  });

  applyFilters();
});


downloadButton.addEventListener("click",function(){
    if (!image) return;
    const now = new Date();

    const dateTime =
            String(now.getDate()).padStart(2, "0") + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            now.getFullYear()+"_"+
            String(now.getHours()).padStart(2, "0") + "-" +
            String(now.getMinutes()).padStart(2, "0") + "-" +
            String(now.getSeconds()).padStart(2, "0");

    const link=document.createElement("a");
    link.download=`edited_image_on_${dateTime}.png`;
    link.href=imageCanvas.toDataURL();
    link.click();
});



const filterPresets = {
    vintage: {
        brightness: 110,
        contrast: 120,
        saturation: 80,
        hueRotation: 0,
        blur: 1,
        grayscale: 10,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    blackWhite: {
        brightness: 100,
        contrast: 130,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vivid: {
        brightness: 105,
        contrast: 140,
        saturation: 160,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 105,
        contrast: 110,
        saturation: 120,
        hueRotation: 10,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 95,
        contrast: 110,
        saturation: 110,
        hueRotation: -10,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dramatic: {
        brightness: 90,
        contrast: 160,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        grayscale: 20,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    soft: {
        brightness: 105,
        contrast: 95,
        saturation: 90,
        hueRotation: 0,
        blur: 1,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 110,
        contrast: 85,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 95,
        contrast: 150,
        saturation: 110,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    moody: {
        brightness: 85,
        contrast: 170,
        saturation: 90,
        hueRotation: 0,
        blur: 0,
        grayscale: 25,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    sunny: {
        brightness: 115,
        contrast: 110,
        saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 110,
        saturation: 85,
        hueRotation: 5,
        blur: 0,
        grayscale: 10,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    night: {
        brightness: 80,
        contrast: 140,
        saturation: 120,
        hueRotation: -5,
        blur: 1,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    highKey: {
        brightness: 120,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};


Object.keys(filterPresets).forEach(presetName=>{
    const presetButton=document.createElement('button');
    presetButton.classList.add("btn");
    presetButton.innerText=presetName;
    presetsContainer.appendChild(presetButton)


    presetButton.addEventListener("click",()=>{

        if (!image) return;

        const preset= filterPresets[presetName];
        
        Object.keys(preset).forEach(filterName=>{
               
               filterElement = document.getElementById(filterName);
               filterElement.value = preset[filterName];
               
               filters[filterName].value=preset[filterName];
        });
        applyFilters();
    });
});


