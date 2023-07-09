import Image from 'next/image'
import styles from './GalaxyLayout.module.css'
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
const GalaxyLayout = ({ data, error }: StoreType) => {
  return (
    <div className={styles.container}>
      {error && <div>Thinks bad happened :(</div>}
      {data !== null &&
        <div className={styles['galaxy-detail']}>
          <Image src={data.img} alt={data.title} width={500} height={500} />
          <div className={styles['galaxy-info']}>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <p>{data.created}</p>
          </div>
        </div>}
    </div>
  )
}

export default GalaxyLayout
