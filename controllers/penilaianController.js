const jwt = require('jsonwebtoken');
const { list_setoran, latihan, penilaian, siswa, item_setoran, penilaian_setoran } = require('../models');


exports.getpenilaianGuru = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const Penilaian = await penilaian.findAll({
            where: {
                id_latihan: req.params.id,
            },
            include: [
                {
                    model: siswa
                },
            ]
        });
        let temps = Penilaian.map((item) =>{
            return {
                id_penilaian : item.id_penilaian,
                id_latihan : item.id_latihan,
                nilai : item.nilai,
                nama_siswa : item.siswa.nama
            }
        })
        const Siswa = await siswa.findAll({
            where : {
                user_id : decoded.userId
            },
            attributes: ['id', 'nama'],
            order: [['nama', 'ASC']]
        });
        let penilaianTotal = Siswa.map((item) => {
            let existingPenilaian = temps.find((item2) => item2.nama_siswa === item.nama);
        
            return existingPenilaian
                ? {
                    ...existingPenilaian,
                    id_siswa: item.id
                }
                : {
                    id_penilaian: null, // Bisa null atau string default
                    id_latihan: req.params.id,
                    nilai: 0,
                    nama_siswa: item.nama,
                    id_siswa: item.id
                };
        });
        res.json({
            status: true,
            data: penilaianTotal,
        });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
}

exports.updatePenilaian = async (req, res) => {
    try {
        const { id_latihan, id_siswa, nilai } = req.body;
        const payload = {
            id_latihan : id_latihan,
            id_penilaian : id_siswa+"-"+id_latihan,
            id_siswa : id_siswa,
            nilai : nilai,
        }
        const Penilaian = await penilaian.upsert(payload);
        res.json({
            status: true,
            message: 'Penilaian Berhasil di update',
            data : Penilaian
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            error
        });
    }
}

exports.getpenilaianSiswa = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const listsetoran = await list_setoran.findAll({
            where : {
                user_id : decoded.userId
            },
            include : [
                {
                    model : item_setoran,
                }
            ]
        })

        const listpenilaian = await penilaian_setoran.findAll({
            where : {
                status : true
            }
        })
        const Siswa = await siswa.findAll({
            where : {
                user_id : decoded.userId
            },
            attributes: ['id', 'nama'],
        })
        const listsiswa = Siswa.map((item) => {
            return {
                id_siswa : item.id,
                nama : item.nama
            }
        })
        const hasilsetoran = hitungNilaiSetoran(listsetoran, listpenilaian, listsiswa);

        const listlatihan = await latihan.findAll({
            where : {
                user_id : decoded.userId
            }
        })

        const listpenilaianlatihan = await penilaian.findAll()

        const nilailatihan = hitungNilaiLatihan(listlatihan,listpenilaianlatihan, listsiswa);
        const nilaiakhir = hitungNilaiAkhir(nilailatihan, hasilsetoran);
        res.json({
            status: true,
            data: nilaiakhir,
        });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
}

const hitungNilaiAkhir = (nilaiLatihan, nilaiSetoran) => {
    // Objek untuk menyimpan nilai akhir per siswa
    let nilaiAkhirSiswa = {};

    // Masukkan nilai latihan ke dalam objek nilaiAkhirSiswa
    nilaiLatihan.forEach((item) => {
        nilaiAkhirSiswa[item.nama] = { 
            nama: item.nama, 
            nilai_latihan: item.nilai, 
            nilai_setoran: 0 // Default jika tidak ada di nilai setoran
        };
    });

    // Masukkan nilai setoran ke dalam objek nilaiAkhirSiswa
    nilaiSetoran.forEach((item) => {
        if (!nilaiAkhirSiswa[item.nama_siswa]) {
            nilaiAkhirSiswa[item.nama_siswa] = { 
                nama: item.nama_siswa, 
                nilai_latihan: 0, // Default jika tidak ada di nilai latihan
                nilai_setoran: item.nilai_setoran
            };
        } else {
            nilaiAkhirSiswa[item.nama_siswa].nilai_setoran = item.nilai_setoran;
        }
    });

    // Hitung nilai akhir berdasarkan rumus
    const hasil = Object.values(nilaiAkhirSiswa).map((siswa) => {
        return {
            nama: siswa.nama,
            nilai_akhir: Math.round((siswa.nilai_latihan + siswa.nilai_setoran) / 2)
        };
    });

    return hasil;
};

const hitungNilaiLatihan = (listLatihan, listPenilaianLatihan, daftarSiswa) => {
    // Objek untuk menyimpan total nilai latihan per siswa
    let nilaiSiswa = {};
    
    // Objek untuk menyimpan jumlah latihan per siswa dari listLatihan
    let jumlahLatihanSiswa = listLatihan.length

    // Looping untuk mengakumulasi nilai latihan per siswa dari listPenilaianLatihan
    listPenilaianLatihan.forEach((penilaian) => {
        const idSiswa = penilaian.id_siswa;
        const nilai = penilaian.nilai;

        // Jika siswa belum ada dalam objek nilai, inisialisasi dengan 0
        if (!nilaiSiswa[idSiswa]) {
            nilaiSiswa[idSiswa] = 0;
        }

        // Tambahkan nilai ke total nilai siswa
        nilaiSiswa[idSiswa] += nilai;
    });

    // Format hasil akhir dengan nama siswa dan nilai rata-rata
    const hasil = Object.keys(nilaiSiswa).map((idSiswa) => {
        // Cari nama siswa berdasarkan ID
        const namaSiswa = daftarSiswa.find(s => s.id_siswa == idSiswa)?.nama || `Siswa ${idSiswa}`;

        // Dapatkan jumlah latihan dari listLatihan (hindari pembagian dengan nol)
        const jumlahLatihan = jumlahLatihanSiswa

        // Hitung nilai akhir (total nilai / jumlah latihan)
        const nilaiAkhir = Math.round(nilaiSiswa[idSiswa] / jumlahLatihan);

        return {
            nama: namaSiswa,
            nilai: nilaiAkhir
        };
    });

    return hasil;
};

const hitungNilaiSetoran = (listSetoran, listPenilaian, daftarSiswa) => {
    // Objek untuk menyimpan jumlah setoran per siswa
    let jumlahSetoranSiswa = {};

    // Menghitung jumlah total setoran yang telah dinilai
    let totalSetoran = listPenilaian.length;

    // Jika total setoran = 0, hindari pembagian dengan nol
    if (totalSetoran === 0) {
        return daftarSiswa.map(s => ({ nama_siswa: s.nama, nilai_setoran: 0 }));
    }

    // Looping untuk menghitung jumlah setoran per siswa
    listPenilaian.forEach((penilaian) => {
        const idSiswa = penilaian.id_siswa;

        // Jika siswa belum ada dalam objek nilai, inisialisasi dengan 0
        if (!jumlahSetoranSiswa[idSiswa]) {
            jumlahSetoranSiswa[idSiswa] = 0;
        }

        // Tambahkan jumlah setoran untuk siswa ini
        jumlahSetoranSiswa[idSiswa] += 1;
    });

    // Format hasil akhir dengan nilai dalam persentase (dibulatkan)
    const hasil = Object.keys(jumlahSetoranSiswa).map((idSiswa) => {
        // Cari nama siswa berdasarkan ID
        const namaSiswa = daftarSiswa.find(s => s.id_siswa == idSiswa)?.nama || `Siswa ${idSiswa}`;

        // Hitung nilai setoran dalam persentase dan bulatkan ke bilangan bulat
        const nilaiSetoran = Math.round((jumlahSetoranSiswa[idSiswa] / totalSetoran) * 100);

        return {
            nama_siswa: namaSiswa,
            nilai_setoran: nilaiSetoran
        };
    });

    return hasil;
};