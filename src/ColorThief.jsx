import ColorThief from 'color-thief';

const getPrimaryColor = (imgSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      resolve(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  });
};
