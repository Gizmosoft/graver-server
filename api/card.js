import Postcard from "../models/Postcard.js";

// Core logic to create a postcard
export const createPostcardLogic = async ({ image, text, creator }) => {
  try {
    // Create a new postcard object
    const postcard = new Postcard({
      image,
      text,
      creator,
    });

    // Save to database
    return await postcard.save();
  } catch (error) {
    console.error("Error in createPostcardLogic:", error);
    throw error;
  }
};

export const fetchPostcards = async ({ creatorId }) => {
  try {
    // Find all postcards created by the specific user
    const postcards = await Postcard.find({ creator: creatorId });
    console.log('Found Postcards: ', postcards);
    return postcards;
  } catch (error) {
    console.error("Error fetching postcards:", error);
    throw error;
  }
};

export const fetchOnePostcard = async ({ postcardId }) => {
    console.log('Postcard ID:', {postcardId});
    try {
        const postcard = await Postcard.findById(postcardId);
        console.log('Found Postcard: ', postcard);
        return postcard;
    } catch (error) {
        console.error("Error fetching postcard:", error);
        throw error;
    }
}

export const deleteOnePostcard = async ({ postcardId }) => {
    try {
        const deletedPostcard = await Postcard.findByIdAndDelete(postcardId);
        console.log('Deleted Postcard: ', deletedPostcard);
        return deletedPostcard;
    } catch (error) {
        console.error("Error removing postcard:", error);
        throw error;
    }
}