import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { carouselImages, restaurants, slots } from "../store/restuarant";
import { db } from "./firebseConfig";

const uploadData = async () => {
  try {
    for (let i = 0; i < restaurants.length; i++) {
      const restuarant = restaurants[i];
      const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
      await setDoc(docRef, restuarant);
    }
    console.log("uploaded sucess");
  } catch (error) {
    console.log("🚀 ~ uploadData ~ error:", error);
  }
};

const uploadCarouselImages = async () => {
  try {
    for (let i = 0; i < carouselImages.length; i++) {
      const item = carouselImages[i];

      // Extract "restaurant_1" from "/restaurants/restaurant_1"
      const restaurantDocId = item.res_id.split("/").pop();

      // Get a DocumentReference to the restaurant
      const resRef = doc(db, "restaurants", restaurantDocId);

      // Upload image group with reference
      await addDoc(collection(db, "restaurantImages"), {
        res_id: resRef, // ✅ this is a DocumentReference
        images: item.images,
      });
    }

    console.log("🎉 Carousel image references uploaded successfully!");
  } catch (error) {
    console.log("🚨 Error uploading carousel images:", error);
  }
};

const uploadRestaurantSlots = async () => {
  try {
    for (let i = 0; i < slots.length; i++) {
      const item = slots[i];

      // Extract "restaurant_1" from "/restaurants/restaurant_1"
      const restaurantDocId = item.ref_id.split("/").pop();

      // Get a DocumentReference
      const resRef = doc(db, "restaurants", restaurantDocId);

      // Upload slot data
      await addDoc(collection(db, "restaurantSlots"), {
        res_id: resRef, // 🔗 store reference here
        slot: item.slot,
      });
    }

    console.log("✅ Restaurant slots uploaded successfully!");
  } catch (error) {
    console.log("🚨 Error uploading restaurant slots:", error);
  }
};

export { uploadCarouselImages, uploadData, uploadRestaurantSlots };
