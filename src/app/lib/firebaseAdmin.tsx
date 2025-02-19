import admin from "firebase-admin";

// Debug: Check if Firebase Admin is already initialized
console.log("🔥 Checking Firebase Admin apps:", admin.apps.length);

if (!admin.apps.length) {
  try {
    console.log("🛠 Initializing Firebase Admin...");
    const serviceAccountBase64 = process.env.FIREBASE_ADMIN_KEY_BASE64;

    if (!serviceAccountBase64) {
      throw new Error("❌ Missing FIREBASE_ADMIN_KEY_BASE64 environment variable.");
    }

    console.log("📜 Decoding FIREBASE_ADMIN_KEY_BASE64...");
    const decodedServiceAccount = Buffer.from(serviceAccountBase64, "base64").toString("utf-8");

    console.log("✅ Decoded JSON:", decodedServiceAccount); // Debug the decoded value

    const serviceAccount = JSON.parse(decodedServiceAccount);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("🚀 Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("🔥 Firebase Admin initialization error:", error);
  }
}

export { admin };
