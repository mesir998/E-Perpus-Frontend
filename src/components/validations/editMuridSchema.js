import * as yup from 'yup'

export const editMuridSchema = yup.object().shape({
  namaLengkap: yup.string().required('Nama Lengkap wajib diisi'),

  email: yup
    .string()
    .email('Format email tidak valid')
    .matches(/^[\w.+-]+@gmail\.com$/, 'Email harus menggunakan @gmail.com')
    .required('Email wajib diisi'),

  nis: yup
    .string()
    .matches(/^[0-9]+$/, 'NIS harus angka')
    .required('NIS wajib diisi'),

  kelas: yup.string().required('Kelas wajib dipilih'),

  jurusan: yup.string().when('kelas', {
    is: (val) => val === 'XI' || val === 'XII',
    then: (schema) => schema.required('Jurusan wajib dipilih'),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),

  jenis_kelamin: yup.string().required('Jenis kelamin wajib dipilih'),

  alamat: yup.string().required('Alamat Rumah wajib diisi'),

  telepon: yup
    .string()
    .required('Nomor Telepon wajib diisi')
    .matches(/^[0-9]+$/, 'Nomor telepon hanya boleh berisi angka')
    .min(10, 'Minimal 10 digit')
    .max(13, 'Maksimal 13 digit'),

  // ✅ Password benar-benar opsional
  password: yup
    .string()
    .transform((value) => (value === '' ? null : value)) // ubah '' jadi null
    .nullable()
    .notRequired()
    .min(6, 'Password minimal 6 karakter'),

  // ✅ Konfirmasi hanya wajib kalau password diisi
  konfirmasiPassword: yup.string().when('password', {
    is: (val) => val && val.length > 0,
    then: (schema) =>
      schema
        .required('Konfirmasi password wajib diisi')
        .oneOf([yup.ref('password')], 'Password tidak cocok'),
    otherwise: (schema) => schema.notRequired(),
  }),
})
