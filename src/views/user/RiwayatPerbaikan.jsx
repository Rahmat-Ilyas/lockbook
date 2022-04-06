import React, { Component } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import Layout from "./Layout";

export default class RiwayatPerbaikan extends Component {
    async componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            var table = $('#dataTable').DataTable();
            table.clear().draw();

            const result = await getDocs(query(collection(db, "perbaikan"), where("uid", "==", user.uid)));
            let i = 1;
            result.forEach((doc) => {
                var res = doc.data();
                var badge_color = '';
                if (res.status == 'ditinjau') badge_color = 'badge-info';
                else if (res.status == 'proses') badge_color = 'badge-warning';
                else if (res.status == 'panding') badge_color = 'badge-primary';
                else if (res.status == 'batal') badge_color = 'badge-danger';
                else if (res.status == 'selesai') badge_color = 'badge-success';

                table.row.add({
                    0: i,
                    1: res.nama_device,
                    2: res.no_series ? res.no_series : '-',
                    3: res.problem,
                    4: res.proccess_by ? res.proccess_by : '-',
                    5: new Date(res.tggl_masuk.seconds * 1000).toLocaleDateString(),
                    6: res.tggl_keluar ? new Date(res.tggl_keluar.seconds * 1000).toLocaleDateString() : '-',
                    7: '<span class="badge ' + badge_color + '">' + res.status.toUpperCase() + '</span>',
                    8: `<a href="#" class="btn-timeline" data-toggle="modal" data-target="#modal-timeline" data-id="` + doc.id + `">lihat timeline</a>`,
                }).draw();

                i++;
            });
        });

        $(document).on('click', '.btn-timeline', async function () {
            var id = $(this).attr('data-id');

            const timeline = await getDocs(query(collection(db, "status_perbaikan"), where("perbaikan_id", "==", id), orderBy('created_at', 'desc')));

            let html = '';
            var i = 1;
            timeline.forEach((doc) => {
                let tml = doc.data();
                var active = '';
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var d = new Date(tml.created_at.seconds * 1000);
                var date = monthNames[d.getMonth()] + ' ' + String(d.getDate()).padStart(2, '0');
                var time = d.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });
                if (i == 1) active = 'tracking-active';

                html += `
                <div class="tracking-item ${active}">
                    <div class="tracking-icon status-intransit">
                        <i class="fas fa-circle"></i>
                    </div>
                    <div class="tracking-date">${date}<span>${time}</span></div>
                    <div class="tracking-content">${tml.header}<span>${tml.keterangan}</span></div>
                </div>
                `
                i++;
            });
            $('#timline-progress').html(html);
        })
    }

    render() {
        return (
            <div>
                <Layout active="riwayat-perbaikan">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#!">Panel Pegawai</a></li>
                            <li className="active">Riwayat Perbaikan</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px', minHeight: '75vh' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-history" /> Riwayat Perbaikan</h2>
                                </div>

                                <div className="page-content-wrap">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* START DEFAULT DATATABLE */}
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title">Data Riwayat Perbaikan</h3>
                                                    <ul className="panel-controls">
                                                    </ul>
                                                </div>
                                                <div className="panel-body">
                                                    <table className="table" id="dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th width="10">No</th>
                                                                <th>Nama Device</th>
                                                                <th>Nomor Series</th>
                                                                <th width="300">Problem</th>
                                                                <th>Ditangani Oleh</th>
                                                                <th>Tggl Masuk</th>
                                                                <th>Tggl Keluar</th>
                                                                <th>Status</th>
                                                                <th width="100">Timeline</th>
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
                            </div>
                        </div>
                    </div >
                </Layout >

                {/* Modal Timeline */}
                <div className="modal fade" id="modal-timeline" tabIndex={-1} role="dialog" aria-labelledby="modal-deleteLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="close close-acc" data-dismiss="modal"><span>×</span></button>
                                <h5 className="modal-title" id="modal-deleteLabel">Timline Progress Pengerjaan</h5>
                            </div>
                            <div className="modal-body">
                                <div className="tracking-list" id="timline-progress">
                                    <h4 className='text-center'><i>Sedang memuat...</i></h4>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}