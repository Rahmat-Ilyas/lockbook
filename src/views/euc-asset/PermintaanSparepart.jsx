import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { auth, db } from '../../config/firebase.js';
import { doc, collection, getDoc, getDocs, orderBy, query, where, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";

export default class PermintaanSparepart extends Component {
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

        const result = await getDocs(query(collection(db, "request_sparepart"), orderBy("status", 'asc')));
        let i = 1;
        result.forEach(async (dta) => {
            var res = dta.data();
            var badge_color, disabled = '';
            if (res.status == 'ditinjau') badge_color = 'badge-info';
            else if (res.status == 'selesai') {
                badge_color = 'badge-success';
                disabled = 'disabled';
            }

            table.row.add({
                0: i,
                1: res.request_by,
                2: res.nama_device,
                3: res.jumlah_dibutuhkan + ' Unit',
                4: res.keterangan,
                5: new Date(res.tggl_permintaan.seconds * 1000).toLocaleDateString(),
                6: '<span class="badge ' + badge_color + '">' + res.status.toUpperCase() + '</span>',
                7: `<button class="btn btn-success btn-accept" data-toggle="modal" data-target="#modal-accept" data-id="` + dta.id + `" ` + disabled + `><i class="fa fa-check-square-o"></i> Selesaikan</button>`,
            }).draw();

            i++;
        });
    }

    handleAccept = async (e) => {
        e.preventDefault();

        $('.btn-accept-conf').html('Lanjutkan <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');
        try {
            let id = e.target.getAttribute("data-id");

            const permintaan = doc(db, "request_sparepart", id);
            await updateDoc(permintaan, {
                status: 'selesai',
            });

            this.notify('success', 'Permintaan sparepart berhasil di selesaikan');
            this.getData();
            $('.close-acc-21').click();
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-accept-conf').html('Lanjutkan').removeAttr('disabled');
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
                <Layout active="permintaan-sparepart">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Permintaan Sparepart</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Data Permintaan Sparepart Yang Habis</h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>Diminta Oleh</th>
                                                        <th>Sparepart Dibutuhkan</th>
                                                        <th>Jumlah Dibutuhkan</th>
                                                        <th>Keterangan</th>
                                                        <th>Tggl Permintaan</th>
                                                        <th>Status</th>
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
                                <button className="close close-acc-21" data-dismiss="modal"><span>×</span></button>
                                <h5 className="modal-title" id="modal-deleteLabel">Selesaikan Permintaan</h5>
                            </div>
                            <div className="modal-body">
                                <p>Silahkan Klik <b>"Lanjutkan"</b> untuk menyelesaikan permintaan sparepart ini. Pastikan stok sudah tersedia!</p>
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