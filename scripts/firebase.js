import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  getDocs,
  collection,
  startAfter,
  query,
  orderBy,
  limit,
  serverTimestamp,
  where,
  updateDoc,
  arrayRemove, arrayUnion,
  deleteDoc,
  increment,
  writeBatch
} from "firebase/firestore";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyCq7c9DZR612xF2VHoobhp-pVdn7wV9OKc",
  authDomain: "ccitc-blogs.firebaseapp.com",
  projectId: "ccitc-blogs",
  storageBucket: "ccitc-blogs.appspot.com",
  messagingSenderId: "412367047980",
  appId: "1:412367047980:web:fa141df62234e3ed8fb089",
  measurementId: "G-2QT5GJSD9F",
};

initializeApp(firebaseConfig);
getAnalytics();

const db = getFirestore();
const batch = writeBatch(db);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const currentUser = writable({ user: null, loaded: false }); // logged in user store

onAuthStateChanged(auth, async (user) => {
  let loaded = true;
  currentUser.set({ user, loaded }) //update the logged in user if exist.
  if (user) {

    const setUser = {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      created_at: serverTimestamp(),
    };

    await setDoc(doc(db, "users", setUser.id), setUser);

  }
})

export const signingOut = () => {
  signOut(auth).then(() => {
    console.log("Signed out")
    currentUser.set({ user: null, loaded: true }) //update user store after logout
  }).catch((error) => {
    console.log(error)
    console.log(error)
  });
}
export const signIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      currentUser.set({ user, loaded: true })
      return { user, token }

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
    });
}

export const getBlogsTitle = async () => {
  let blogsTitle = [];
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => blogsTitle.push(doc.data()));
  return blogsTitle;
};

var lastPost = null

export const getAllBlogPosts = async (next, trim = true) => {
  let Posts = [];
  const q = next ? query(
    collection(db, "posts"),
    where("approval", "==", true),
    orderBy("created_at", 'desc'),
    startAfter(next ? lastPost : 0),
    limit(6),
  ) : query(
    collection(db, "posts"),
    where("approval", "==", true),
    orderBy("created_at", 'desc'),
    limit(6),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {

    if (trim) {
      const { id, user_id, title, description, vote, comment_no, created_at, URL } = doc.data()
      Posts.push({ id, user_id, title, description, vote, comment_no, created_at, URL })
    } else
      Posts.push(doc.data())
  });

  lastPost = querySnapshot.docs[querySnapshot?.docs.length - 1]
  if (querySnapshot.empty) {
    lastPost = null
  }

  return { posts: Posts, lastPost };
};

export const getAllSortedPosts = async (next, trim = true, sortBy = "TIME") => {
  let Posts = [];
  let q;
  if (sortBy === "TIME") {
    q = next ? query(
      collection(db, "posts"),
      where("approval", "==", true),
      orderBy("created_at", 'desc'),
      startAfter(next ? lastPost : 0),
      limit(6),
    ) : query(
      collection(db, "posts"),
      where("approval", "==", true),
      orderBy("created_at", 'desc'),
      limit(6),
    );

  } else if (sortBy === "LIKES") {
    q = query(
      collection(db, "posts"),
      where("approval", "==", true),
      orderBy("vote"),
      startAfter(next ? lastPost : 0),
      limit(6),
    );
  } else if (sortBy === "COMMENTS") {
    q = query(
      collection(db, "posts"),
      where("approval", "==", true),
      orderBy("comment_no"),
      startAfter(next ? lastPost : 0),
      limit(6),
    );
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (trim) {
      const { id, user_id, title, description, vote, comment_no, created_at, URL } = doc.data()
      Posts.push({ id, user_id, title, description, vote, comment_no, created_at, URL })
    } else
      Posts.push(doc.data())
  });

  Posts = sortBy !== "TIME" ? Posts.reverse() : Posts;

  lastPost = querySnapshot.docs[querySnapshot?.docs.length - 1]
  if (querySnapshot.empty) {
    lastPost = null
  }

  return { posts: Posts, lastPost };
}

export const getBlogPosts = async (blog_id, next, trim = true, sortBy = "TIME") => {
  let Posts = [];
  let q;
  if (sortBy === "TIME") {
    q = query(
      collection(db, "posts"),
      where("approval", "==", true),
      where("blog_id", "==", blog_id),
      orderBy("created_at"),
      orderBy("vote"),
      startAfter(next ? lastPost : 0),
      limit(6),
    );
  } else if (sortBy === "LIKES") {
    q = query(
      collection(db, "posts"),
      where("approval", "==", true),
      where("blog_id", "==", blog_id),
      orderBy("vote"),
      startAfter(next ? lastPost : 0),
      limit(6),
    );
  } else if (sortBy === "COMMENTS") {
    q = query(
      collection(db, "posts"),
      where("approval", "==", true),
      where("blog_id", "==", blog_id),
      orderBy("vote"),
      startAfter(next ? lastPost : 0),
      limit(6),
    );
  }

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (trim) {
      const { id, user_id, title, description, vote, comment_no, created_at, URL } = doc.data()
      Posts.push({ id, user_id, title, description, vote, comment_no, created_at, URL })
    } else
      Posts.push(doc.data())
  });

  Posts = Posts.reverse();

  lastPost = querySnapshot.docs[querySnapshot?.docs.length - 1]
  if (querySnapshot.empty) {
    lastPost = null
  }

  return { posts: Posts, lastPost };
};

export const getBlogCategoryDetail = async (id) => {
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { name, description } = docSnap.data();
    return { name, description }
  } else {
    // doc.data() will be undefined in this case
    return { error: { code: 404 } }
  }

}

export const getComments = async (id, next, lastComment) => {
  let comments = [];
  const q = query(
    collection(db, "comments"),
    where("post_id", "==", id),
    orderBy("created_at"),
    startAfter(next ? lastComment : 0),
    limit(6),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    comments.push(doc.data());
  })
  console.log(comments)
  let lastCommentRef = querySnapshot[querySnapshot?.length - 1];
  if (querySnapshot.empty) {
    lastCommentRef = null
  }

  comments = comments.reverse()
  return { comments, lastComment: lastCommentRef };
}

export const getUser = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export const getPost = async (id) => {
  const docRef = doc(db, "posts", id)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().approval) {
    return docSnap.data()
  } else if (docSnap.exists() && !docSnap.data().approval) {
    console.log("The post has not been approved yet!");
    return { error: "The post has not been approved yet!!" }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return { error: "No such document!" }
  }
}

export const CreatedAt = (time) => {
  function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} years`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes`;
    }
    return `${Math.floor(seconds || 0)} seconds`;
  }
  return timeSince(time * 1000) < 0
    ? '0 seconds ago'
    : `${timeSince(time * 1000)} ago`;
}

//Write
export const addPost = async (post) => {
  const post_id = doc(collection(db, "posts")).id;
  const newPost = {
    ...post,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    approval: false,
    vote: [],
    comment_no: 0,
    id: post_id,
  }

  await setDoc(doc(collection(db, "posts"), post_id), newPost)
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
  return { message: "Your blog has been submitted and is currently being reviewed." }
};

export const editPost = async (post_id, post) => {
  const ref = doc(db, "posts", post_id);

  await updateDoc(ref, {
    ...post, updated_at: serverTimestamp()
  })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
  return { message: "Your blog has been updated." }
}

export const upvotePost = async (post_id, user_id) => {
  const ref = doc(db, "posts", post_id);
  await updateDoc(ref, {
    vote: arrayUnion(user_id)
  }).catch(err => console.log(err))
}

export const downvotePost = async (post_id, user_id) => {
  const ref = doc(db, "posts", post_id);
  await updateDoc(ref, {
    vote: arrayRemove(user_id)
  }).catch(err => console.log(err))
}

export const deletePost = async (post_id) => {
  const ref = doc(db, "posts", post_id)

  batch.delete(ref);
  const comments = query(
    collection(db, "comments"),
    where("post_id", "==", post_id),
  );

  const querySnapshot = await getDocs(comments);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  })
  await batch.commit()
    .catch(err => err.message)
  return { message: "Your post has been deleted" }
};

export const writeComment = async (comment) => {
  const comments = collection(db, "comments");
  const postRef = doc(db, "posts", comment?.post_id);

  const comment_id = doc(comments).id;
  const newComment = {
    ...comment,
    id: comment_id,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  }
  try {
    await setDoc(doc(comments, comment_id), newComment)

    await updateDoc(postRef, {
      comment_no: increment(1),
    })

  } catch (error) {
    console.log(error);
    return { error: error.message }
  }
}

export const deleteComment = async (comment) => {
  const ref = doc(db, "comments", comment?.id);
  const postRef = doc(db, "posts", comment?.post_id);
  try {
    await deleteDoc(ref).catch(err => ({ error: err.message }))
    await updateDoc(postRef, {
      comment_no: increment(-1),
    })
    return { message: "Comment has been deleted" }
  } catch (error) {
    console.log(error);
    return { error: error.message }
  }

}

