import Home from '@/components/screens/Home';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Coffee"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Home />
    </Main>
  );
};

export default Index;
