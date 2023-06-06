use wasm_bindgen::prelude::*;
use web_sys::console::log_1 as log;
use base64::{decode,encode};
use image::load_from_memory;
use image::ImageOutputFormat::Png;
use std::io::Cursor;


#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) -> String {
  log(&"Grayscale Called".into());

  let base64_to_vector = decode(encoded_file).unwrap();
  log(&"image decoded".into());

  let mut img = load_from_memory(&base64_to_vector).unwrap();
  log(&"image loaded".into());

  img = img.grayscale();
  log(&"GrayScale effect applied".into());

  let mut buffer = vec![];
  img.write_to(&mut Cursor::new(&mut buffer), Png).unwrap();
  log(&"new image written".into());

  let encoded_img= encode(&buffer);
  let data_url=format!(
    "data:image/png;base64,{}",encoded_img
  );

  data_url
}

#[wasm_bindgen]
pub fn blur(encoded_file: &str) -> String {
  log(&"Grayscale Called".into());

  let base64_to_vector = decode(encoded_file).unwrap();
  log(&"image decoded".into());

  let mut img = load_from_memory(&base64_to_vector).unwrap();
  log(&"image loaded".into());

  img = img.blur(21.0);
  log(&"GrayScale effect applied".into());

  let mut buffer = vec![];
  img.write_to(&mut Cursor::new(&mut buffer), Png).unwrap();
  log(&"new image written".into());

  let encoded_img= encode(&buffer);
  let data_url=format!(
    "data:image/png;base64,{}",encoded_img
  );

  data_url
}