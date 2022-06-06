import {firestore} from "../../config/firebaseSetup";

export const subscribeToUser = async (currentUId: string, otherUId: string) => {
    try {
        const responseCurrent =  firestore.collection('subscribers').doc(currentUId)
        const subscriptions = await firestore.collection('subscribers').doc(otherUId).get().then(snapshot => snapshot.data()?.subscriptions);
        const subscribers = await firestore.collection('subscribers').doc(currentUId).get().then(snapshot => snapshot.data()?.subscribers);
        subscriptions.push(currentUId)
        subscribers.push(otherUId)
        await  responseCurrent.update({subscribers: subscribers});
        const responseOther =  firestore.collection('subscribers').doc(otherUId)
        await  responseOther.update({subscriptions: subscriptions});
    }
    catch (e){
        console.error(e)
    }
}

export const unsubscribeToUser = async (currentUId: string, otherUId: string) => {
    try {
        const responseCurrent =  firestore.collection('subscribers').doc(currentUId)
        const subscriptions = await firestore.collection('subscribers').doc(otherUId).get().then(snapshot => snapshot.data()?.subscriptions);
        const subscribers = await firestore.collection('subscribers').doc(currentUId).get().then(snapshot => snapshot.data()?.subscribers);
        const subscriptionsFiltered =  subscriptions.filter(item => item != currentUId)
        const subscribersFiltered = subscribers.filter(item => item != otherUId)
        await  responseCurrent.update({subscribers: subscribersFiltered});
        const responseOther =  firestore.collection('subscribers').doc(otherUId)
        await  responseOther.update({subscriptions: subscriptionsFiltered});
    }
    catch (e){
        console.error(e)
    }
}

export const checkSubscription = async (currentUId: string, otherUId: string) => {
    try {
     const subscribers = await firestore.collection('subscribers').doc(currentUId).get().then(snapshot => snapshot.data()?.subscribers);
        const check = !!subscribers.find(item => item === otherUId)
        return check
    }
    catch (e){
        console.error(e)
    }
}

export const getSubscriptionCount = async (currentUId: string) => {
    try {
        const data = await firestore.collection('subscribers').doc(currentUId).get().then(snapshot => snapshot.data());
        const subscriptions = data?.subscriptions.length
        const subscribers = data.subscribers.length
        return {subscriptions, subscribers}
    }
    catch (e){
        console.error(e)
    }
}

export const getCurrentSubscribers =  async (currentUId: string) => {
    try {
        const subscribers = await firestore.collection('subscribers').doc(currentUId).get().then(snapshot => snapshot.data()?.subscribers);
        const subscribersData = []
        for (let i = 0; i < subscribers.length; i++) {
            const subscriberItem= await  firestore.collection('users').doc(subscribers[i]).get().then(snapshot => snapshot.data())
            subscribersData.push(subscriberItem)
        }
        return subscribersData
    }
    catch (e){
        console.error(e)
    }
}

export const getCurrentSubscritions =  async (currentUId: string) => {
    try {
        const subscriptions = await firestore.collection('subscribers').doc(currentUId).get().then(snapshot => snapshot.data()?.subscriptions);
        const subscriptionsData = []
        for (let i = 0; i < subscriptions.length; i++) {
            const subscriptionItem= await  firestore.collection('users').doc(subscriptions[i]).get().then(snapshot => snapshot.data())
            subscriptionsData.push(subscriptionItem)
        }
        return subscriptionsData
    }
    catch (e){
        console.error(e)
    }
}