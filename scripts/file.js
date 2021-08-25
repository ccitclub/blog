const compressImage = (e, callBack) => {
  const MAX_WIDTH = 800
  const MAX_HEIGHT = 460
  const MIME_TYPE = "image/webp"
  var quality = 0.7

  let ImgData;
  const file = e.target.files[0]
  const blobURL = URL.createObjectURL(file)
  const img = new Image()
  img.src = blobURL

  if (img.width >= 1920 || img.height >= 1080) quality = .5
  if (e.target.files[0].size <= 99000) quality = 1

  img.onerror = () => {
    URL.revokeObjectURL(img.src)
    console.log('Cannot load the image')
  }

  img.onload = () => {
    URL.revokeObjectURL(img.src)
    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT)
    const canvas = document.createElement('canvas')
    canvas.width = newWidth
    canvas.height = newHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, newWidth, newHeight)

    ImgData = canvas.toDataURL(MIME_TYPE, quality)
    callBack(ImgData)
  }
}

function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

export default compressImage
