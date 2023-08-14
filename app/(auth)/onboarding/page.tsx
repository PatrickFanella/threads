import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';

async function Page() {
    const user = await currentUser();

    const userInfo = {
        id: '666',
        bio:"I'm a software engineer",
        username: 'johndoe',
        image: 'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
    }

    const userData = {
        id: user?.id,
        objectId: userInfo?.id,
        username: userInfo?.username || user?.username,
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    }
    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='head-text'>Onboarding</h1>
            <p className='mt-3 text-base-regular text-light-2'>
                Complete your profile now to use BEtwiTER
            </p>
            <section className='mt-9 bg-dark-2 p-10'>
                <AccountProfile user={user} />
            </section>
        </main>
    );
}

export default Page;
