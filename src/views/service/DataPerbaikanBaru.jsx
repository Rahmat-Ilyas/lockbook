import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { auth, db } from '../../config/firebase.js';
import { doc, collection, getDoc, getDocs, orderBy, query, where, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";

export default class DataPerbaikanBaru extends Component {
    async componentDidMount() {
        this.getData();

        $(document).on('click', '.btn-accept', function () {
            let id = $(this).attr('data-id');
            $('.btn-accept-conf').attr('data-id', id);
        });
    }

    getData = async () => {
        var table = $('#dataTable').DataTable();
        table.clear().draw();

        const result = await getDocs(query(collection(db, "perbaikan"), where('status', '==', 'ditinjau'), orderBy("tggl_masuk", 'asc')));
        let i = 1;
        result.forEach(async (dta) => {
            var res = dta.data();
            var pegawai = await getDoc(doc(db, "pegawai", res.pegawai_id));
            var pgw = pegawai.data();
            var badge_color = '';
            if (res.status == 'ditinjau') badge_color = 'badge-info';
            else if (res.status == 'proses') badge_color = 'badge-warning';
            else if (res.status == 'panding') badge_color = 'badge-primary';
            else if (res.status == 'batal') badge_color = 'badge-danger';
            else if (res.status == 'selesai') badge_color = 'badge-success';

            table.row.add({
                0: i,
                1: pgw.nip,
                2: pgw.nama,
                3: res.nama_device,
                4: res.no_series ? res.no_series : '-',
                5: res.problem,
                6: new Date(res.tggl_masuk.seconds * 1000).toLocaleDateString(),
                7: `<button class="btn btn-success btn-accept" data-toggle="modal" data-target="#modal-accept" data-id="` + dta.id + `"><i class="fa fa-tools"></i> Kerjakan</button>`,
            }).draw();

            i++;
        });
    }

    handleAccept = async (e) => {
        e.preventDefault();

        $('.btn-accept-conf').html('Lanjutkan <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');
        try {
            let uid = getAuth().currentUser.uid;
            let id = e.target.getAttribute("data-id");

            const res = query(collection(db, "it_service"), where("uid", "==", uid));
            const user = await getDocs(res);
            let proccess_by, service_id;
            user.forEach((doc) => {
                let res = doc.data();
                proccess_by = res.nama;
                service_id = doc.id;
            });

            const perbaikan = doc(db, "perbaikan", id);
            await updateDoc(perbaikan, {
                proccess_by,
                service_id,
                status: 'proses',
            });

            await addDoc(collection(db, "status_perbaikan"), {
                perbaikan_id: id,
                status: 'proses',
                header: 'Sedang Diproses',
                keterangan: 'Tim IT Service (' + proccess_by + ') telah menerima pengajuan perbaikan anda. Silahkan bawah barang anda ke Departemen IT',
                created_at: serverTimestamp(),
            });

            this.notify('success', 'Data Pengerjaan berhasil diambil');
            this.getData();
            $('.close-acc').click();
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-accept-conf').html('Lanjutkan').removeAttr('disabled');

        setTimeout(function () {
            window.location.href = '/service/perbaikan-berlangsung';
        }, 3000);
    }

    notify = (status, message) => {
        var config = {
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
        };
        if (status == 'success') toast.success(message, config);
        else if (status == 'info') toast.info(message, config);
        else if (status == 'warn') toast.warn(message, config);
        else if (status == 'error') toast.error(message, config);
    }

    render() {
        return (
            <div>
                <Layout active="data-perbaikan">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Data Perbaikan</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Data Perbaikan (Baru Masuk)</h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>B/N</th>
                                                        <th>Nama Pegawai</th>
                                                        <th>Nama Device</th>
                                                        <th>Nomor Series</th>
                                                        <th width="350">Problem</th>
                                                        <th>Tggl Masuk</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* END DEFAULT DATATABLE */}

                                </div>
                            </div>

                        </div>
                    </div >
                </Layout >

                {/* Modal Accept */}
                <div className="modal fade" id="modal-accept" tabIndex={-1} role="dialog" aria-labelledby="modal-deleteLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="close close-acc" data-dismiss="modal"><span>×</span></button>
                                <h5 className="modal-title" id="modal-deleteLabel">Lanjutkan Pengerjaan</h5>
                            </div>
                            <div className="modal-body">
                                <p>Silahkan Klik <b>"Lanjutkan"</b> untuk memproses data perbaikan ini!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                <a href="#" className="btn btn-success btn-accept-conf" onClick={this.handleAccept}>Lanjutkan</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}