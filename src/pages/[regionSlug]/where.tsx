import { Area as AreaWhere } from '@/components/screens/where/Area'
import { ListingsBboxContextProvider } from '@/modules/marketplace'

const RealEstatePage = () => {
  return (
    <ListingsBboxContextProvider>
      <AreaWhere />
    </ListingsBboxContextProvider>
  )
}

export default RealEstatePage
