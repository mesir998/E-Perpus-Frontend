import * as yup from 'yup'

export const registerSchema = yup.object().shape({
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

  password: yup
    .string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password wajib diisi'),

  konfirmasiPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password dan konfirmasi tidak cocok')
    .required('Konfirmasi Password wajib diisi'),
})
