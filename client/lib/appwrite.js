import { Client, Account, ID, Databases } from 'react-native-appwrite';

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_URL,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_DATABASE_ID
}

// Init React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Appwrite Endpoint
  .setProject(config.projectId) // Project ID
  .setPlatform(config.platform) // Application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);

// TODO: Look for a better way to Handle Exceptions and display user friendly error messages
// account creation
export const createUser = async (name, email, password) => {
  try {
    // create a new account with Appwrite
    const newAccount = await account.create(ID.unique(), email, password, name)

    // throw error if there was issues creating new account
    if (!newAccount) throw new Error("Account creation failed");

    // login in the new user
    login(email, password)

    // store user details in database 
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        userId: newAccount.$id,
        email: email,
        name: name,
      }
    );

    // return the newly created user document
    return newUser
  } catch (error) {
    // handle errors 
    if (error.code === 409 && error.type === 'user_already_exists') {
      throw new Error("This email is already in use. Please use a different email.")
    }
    else if (error.code === 409 && error.type === 'user_email_already_exists') {
      throw new Error("This email is already in use. Please use a different email.")
    }
    else if (error.code === 429 && error.type === 'general_rate_limit_exceeded') {
      throw new Error("Please wait a moment before trying again.")
    }
    else if (error.message.includes("Invalid `password` param")) {
      throw new Error("Password must be 8-265 characters long and not too common.");
    }
    else {
      throw new Error(error.message || 'Failed to create account')
    }
  }
}


// login account
export const login = async (email, password) => {
  try {
    // create a session and login in user with Appwrite
    const session = await account.createEmailPasswordSession(email, password);

    // return the newly created session
    return session;
  } catch (error) {
    // handle errors
    throw new Error(error)
  }
}