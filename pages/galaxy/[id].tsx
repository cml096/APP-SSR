import fetch from 'isomorphic-unfetch'
import GalaxyLayout from '@components/GalaxyLayout/GalaxyLayout'
interface GalaxyType {
    id: string;
    img: string;
    title: string;
    description: string;
    created: string;
}
interface StoreType {
    data: GalaxyType | null;
    error: boolean;
}
const defaultStore = {
  data: null,
  error: false
}

export const getServerSideProps = async ({ params }: any) => {
  try {
    const response = await fetch(`http://localhost:3000/api/galaxy/${params?.id}`)
    const { data } = await response.json()
    return {
      props: {
        ...defaultStore,
        data
      }
    }
  } catch (_e) {
    return {
      props: {
        ...defaultStore,
        error: true
      }
    }
  }
}

const Galaxy = (props: StoreType) => {
  return (
    <GalaxyLayout {...props} />
  )
}

export default Galaxy
