const Class_names = {
  0: "Ao quan",
  1: "Bau troi",
  2: "Bia sach",
  3: "Bien",
  4: "Cay coi",
  5: "Chup man hinh",
  6: "Dien thoai",
  7: "Do an",
  8: "Doi nui",
  9: "Dong ruong",
  10: "Duong pho",
  11: "Giay",
  12: "Hoa",
  13: "Hoa don",
  14: "Nguoi",
  15: "Selfie",
  16: "Song suoi ho",
  17: "Tai lieu",
  18: "Thu cung",
  19: "Toa nha",
  20: "Xe co",
};

function range(start, end) {
  var foo = [];
  for (var i = start; i <= end; i++) {
    foo.push(i);
  }
  return foo;
}

function largestIndex(n = 1, array) {
  let max = [];
  let array_copy = array.slice();
  array_copy.sort((a, b) => b - a);
  let top_n = array_copy.slice(0, n);

  for (counter = 0; counter < n; counter++) {
    max.push([array.indexOf(top_n[counter]), top_n[counter]]);
  }
  // console.log(max);

  return max;
}

function get_class_name(n = 1, array) {
  let names = [];
  for (counter = 0; counter < n; counter++) {
    var [index, prob] = array[counter];
    names.push({
      class_name: Class_names[index],
      probability: prob,
    });
  }
  // console.log(names);
  return names;
}

async function myFirstTfjs() {
  // const model = await tf.loadLayersModel("../model/xception_saved_model/model.json");
  // // model.summary();
  // // addGallery();

  modelName = String(document.getElementById("models").value);
  const model = await tf.loadLayersModel(`../model/${modelName}_saved_model/model.json`);

  // read images
  var getDivId = document.getElementById("imagesContainer");
  var images = getDivId.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) {
    let image = images[i];
    //let image = document.getElementById("display_image");

    let img = tf.browser.fromPixels(image);
    let normalizationOffset = tf.scalar(255 / 2); // 127.5
    let tensor = img
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .reverse(2)
      .sub(normalizationOffset)
      .div(normalizationOffset)
      .expandDims();
    // 2. Predict
    let predictions = await model.predict(tensor);
    predictions = predictions.dataSync();

    let num_pred = 3;
    var predictions_name = get_class_name(
      num_pred,
      largestIndex(num_pred, predictions)
    );
    // console.log(predictions);
    console.log(predictions_name);

    // hiện kết quả
    $("#result_info").append(`<div class="result">
    <img style="max-width:300px; max-height: 300px; border-radius:1rem" src='${image.src}'>
    <span class="img-label">${predictions_name[0].class_name}</span>
    </div>`);
  }

  // let image = document.getElementById("display_image");
  // let img = tf.browser.fromPixels(image);
  // let normalizationOffset = tf.scalar(255 / 2); // 127.5
  // let tensor = img
  //     .resizeNearestNeighbor([224, 224])
  //     .toFloat()
  //     .sub(normalizationOffset)
  //     .div(normalizationOffset)
  //     .reverse(2)
  //     .expandDims();

  // // 2. Predict
  // let predictions = await model.predict(tensor);
  // predictions = predictions.dataSync();

  // let num_pred = 3;
  // var predictions_name = get_class_name(num_pred, largestIndex(num_pred, predictions));
  // // console.log(predictions);
  // console.log(predictions_name);

  // // hiện kết quả
  // $("#result_info").empty();

  // // hiện chỉ một kết quả
  // $("#result_info").append(`<li>${predictions_name[0].class_name}</li>`);

  // hiện nhiều kết quả
  // predictions_name.forEach(function(label) {
  //     $("#result_info").append(`<li>${label.class_name}: ${label.probability.toFixed(5)}</li>`);
  // });

  // return model;
}

$(function () {
  $("#fileinput").change(function () {
    if (this.files && this.files[0]) {
      for (var i = 0; i < this.files.length; i++) {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[i]);
      }
      $("#display_image").css("display", "none");
    }
  });
});

function imageIsLoaded(e) {
  $("#imagesContainer").append(
    '<img style="max-width:300px; max-height: 300px; border-radius:1rem" src=' +
      e.target.result +
      ">"
  );
}

function readImages() {
  var getDivId = document.getElementById("imagesContainer");
  var images = getDivId.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) {
    console.log(i);
  }
}

// $("#fileinput").change(function() {
//     let reader = new FileReader();
//     reader.onload = function() {
//         let dataURL = reader.result;

//         $("#display_image").attr("src", dataURL);
//         $("#result_info").empty();
//     }

//     let file = $("#fileinput").prop("files")[0];
//     reader.readAsDataURL(file);
// });

// container = document.getElementById("imagesContainer");

// function createImages(item, index) {
//     container.innerHTML = container.innerHTML + "<img src=\"" + baseUrl + item + "\"/><br/>";
// }

document.getElementById("run_pred_btn").onclick = function () {
  $("#result_info").empty();
  myFirstTfjs();

  // predict(my_model);
};
