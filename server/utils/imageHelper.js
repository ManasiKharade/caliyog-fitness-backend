/**
 * imageHelper.js
 * Utility helper functions to handle image storage in MongoDB as Buffer
 * and conversion to base64 Data URLs for frontend delivery.
 */

/**
 * Builds a DB image object from a Multer file.
 * @param {Express.Multer.File} file - Multer uploaded file from memory storage
 * @returns {{data: Buffer, contentType: string}|null} MongoDB image schema object
 */
const buildImageObject = (file) => {
  if (!file) return null;
  return {
    data: file.buffer,
    contentType: file.mimetype,
  };
};

/**
 * Converts a database image buffer object to a base64 Data URL.
 * @param {{data: Buffer, contentType: string}} imageObj - Image object containing data buffer and mimetype
 * @returns {string|null} Base64 Data URL string
 */
const toBase64Url = (imageObj) => {
  if (!imageObj || !imageObj.data || !imageObj.contentType) return null;
  const base64 = imageObj.data.toString("base64");
  return `data:${imageObj.contentType};base64,${base64}`;
};

/**
 * Attaches base64 data URLs to a Mongoose document or plain object.
 * Converts specified image fields into base64 strings and populates compatibility URLs.
 * @param {Object} doc - Mongoose document or plain JavaScript object
 * @param {Array<string>} fields - Field names that hold the {data, contentType} objects
 * @returns {Object} Plain object with image fields converted to base64 strings
 */
const attachBase64Images = (doc, fields = ["image", "img"]) => {
  if (!doc) return doc;
  
  // Convert Mongoose document to a plain JavaScript object
  const obj = doc.toObject ? doc.toObject() : { ...doc };

  fields.forEach((field) => {
    if (obj[field] && obj[field].data) {
      const base64Url = toBase64Url(obj[field]);
      if (base64Url) {
        // Overwrite the original field with the base64 URL for direct usage
        obj[field] = base64Url;
        
        // Populate additional URL fields for frontend compatibility (e.g., imageUrl, imgUrl, image1Url)
        if (field === "image") {
          obj.imageUrl = base64Url;
        } else if (field === "img") {
          obj.imgUrl = base64Url;
        } else {
          obj[`${field}Url`] = base64Url;
        }
      }
    } else if (obj[field] && typeof obj[field] === "object" && !obj[field].data) {
      // If the field is an empty object or has no data, set it to empty string/null for consistency
      obj[field] = "";
    }
  });

  return obj;
};

module.exports = {
  buildImageObject,
  toBase64Url,
  attachBase64Images,
};
