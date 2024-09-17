import Footer from './components/Footer';
import Header from './components/Header';
import SubstitutionCipher from './screens/SubstitutionCipher';

function App() {
    return (
        <>
            <Header />
            <p className='text-center text-gray-500 dark:text-gray-400 py-5'>
                You're a flower on earth, let's make your life beautiful and meaningful (◕‿↼).
            </p>
            <SubstitutionCipher />
            <Footer />
        </>
    );
}

export default App;
