import { ChangeEvent, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { MUTATION_UPLOAD_FILE } from '@/modules/file'
import {
  MUTATION_UPDATE_USER_PROFILE,
  QUERY_GET_PUBLIC_PROFILE,
  QUERY_GET_USER_PROFILE,
} from '@/modules/profile'

export const useChangePicture = (fieldName: 'photoUrl' | 'coverUrl') => {
  const [loadFile, { loading: isLoadingFile, error: fileError }] =
    useMutation(MUTATION_UPLOAD_FILE)
  const [updateUserProfile] = useMutation(MUTATION_UPDATE_USER_PROFILE)
  const { data: profileData } = useQuery(QUERY_GET_USER_PROFILE)

  const onFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.item(0)) {
        const result = await loadFile({
          variables: {
            public: true,
            file: e.target.files.item(0),
          },
        })

        const url = result.data?.uploadFile?.url

        const profile = profileData?.getUserProfile

        if (url && profile) {
          updateUserProfile({
            variables: {
              input: {
                userName: profile.userName,
                firstName: profile.firstName,
                lastName: profile.lastName,
                gender: profile.gender,
                birthdate: profile.birthdate,
                bio: profile.bio,
                phone: profile.phone,
                photoUrl: fieldName === 'photoUrl' ? url : profile.photoUrl,
                coverUrl: fieldName === 'coverUrl' ? url : profile.coverUrl,
              },
            },
            refetchQueries: [QUERY_GET_USER_PROFILE, QUERY_GET_PUBLIC_PROFILE],
          })
        }
      }
    },
    [fieldName, profileData, loadFile, updateUserProfile],
  )

  return {
    onFileUpload,
    isLoadingFile,
    fileError,
  }
}
