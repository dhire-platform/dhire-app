import { Applicant, IJobs } from '@/interfaces/store/data/job.interface';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { ApplicantStatus } from 'src/lib/enums/enums';
import { useState, useEffect } from 'react';

export const ApplyButton = ({ job }: { job: IJobs }) => {
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user, userProfile, updateUserProfile } = useProfileStore();
  const toast = useToast();
  const applyForJob = async () => {
    setIsSubmitting(true);
    let status, msg;
    const data: Applicant = {
      user_id: user.id,
      interview_step: 'first',
      archieved: false,
      status: ApplicantStatus.NOTVIEWED,
    };
    try {
      const newApplicant = await axios.post('/api/applicant/' + job.id, data);
      console.log(newApplicant);
      let ogApplicant = userProfile.Applicant || [];
      const newUser = {
        ...userProfile,
        Applicant: [...ogApplicant, { ...newApplicant.data }],
      };
      updateUserProfile(newUser);
      msg = 'Successfully Applied.';
    } catch (error: any) {
      status = 'error';
      msg = 'Some error occured! please apply late.';
    }
    toast({
      position: 'top',
      title: status === 'error' ? 'ERROR !!' : 'Success !',
      description: msg,
      status: status === 'error' ? 'error' : 'success',
      duration: 3000,
      isClosable: true,
      containerStyle: {
        marginTop: '10%',
      },
    });
    setIsSubmitting(false);
  };
  useEffect(() => {
    userProfile.Applicant?.map(({ jobId }) => {
      if (jobId === job.id) {
        setIsApplied(true);
        return;
      }
    });
  }, [userProfile.Applicant]);
  return (
    <>
      {isApplied ? (
        <Button variant="link">View Status</Button>
      ) : (
        <Button
          type="submit"
          w="100px"
          onClick={applyForJob}
          isDisabled={isApplied}
          isLoading={isSubmitting}
        >
          Apply
        </Button>
      )}
    </>
  );
};
