import { Container, Heading, Text, VStack } from '@chakra-ui/layout';
import { useProfileStore } from 'src/app/store/profile/profileStore';
export const AboutOrganisation = () => {
  const { recruiterProfile } = useProfileStore();
  return (
    <VStack
      w="95%"
      bg="white"
      borderRadius="10px"
      gap={3}
      p={'1.8em 3em'}
      alignItems="flex-start"
    >
      <Heading fontSize={['20px', '22px', '25px']}>
        About Organisation/Culture
      </Heading>
      <Text fontSize={['11px', '12px', '14px']}>
        Lörem ipsum laröst såv. Tonade prelig som biodir höper vin. Podat enade
        pöska. Tratipp kungspudel och resopängen, sevinat. Gyde Kron
        självkarantän bede en stöddjur vyrade. Tisade gede. Dett sogeras till
        dide. Stjärtfluss semigraf i bädektigt dekas i nöktig. Ore akuktigt i
        terates. Trir minade, hjulboja. Fafånade. Nösev nira nyvöskap. Astrorat
        kotånde, och saktiga kagisk vis. Gyr heterovalens såvärar mitt ofälig.
        Homopis olig subed. Löktig fapön. Byra readat och egoren. Plarat jöskap
        för att roputin. Radiocism mök.
      </Text>
    </VStack>
  );
};
