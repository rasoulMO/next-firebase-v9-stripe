import { db } from '../firebase/firebaseClient';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { User } from 'firebase/auth';

export async function createCheckoutSession(user: User) {

  const docRef = await addDoc(collection(db, `users/${user?.uid}/checkout_sessions`), {
    price: 'price_1JMBZGBPmPRkJ4wL4Xd4QWNW',
    success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/cancel`,
  });

  onSnapshot(docRef, (snap) => {
    const { error, url } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (url) {
      // We have a Stripe Checkout URL, let's redirect.
      window.location.assign(url);
    }
  });
}
