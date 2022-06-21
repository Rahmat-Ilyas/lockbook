import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import Layout from "./Layout";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import WebViewer from '@pdftron/pdfjs-express';

export default class Laporan extends Component {
    async componentDidMount() {
        const self = this;
        $('#test-table-xls-button').hide();
        var d = new Date();
        var m = ('0' + (d.getMonth() + 1)).slice(-2);
        var month = d.getFullYear() + '-' + m;

        this.getData(month);

        $('#set-month').change(function () {
            var month = $(this).val();
            self.getData(month);
        })
    }

    getData = async (month) => {
        var table = $('#dataTable').DataTable();
        table.clear().draw();

        const timestamp = new Date(month + '-01');
        const str_timestamp = new Date(month + '-01');
        const end_timestamp = new Date(timestamp.setMonth(timestamp.getMonth() + 1));

        const result = await getDocs(query(collection(db, "perbaikan"), where("tggl_masuk", ">=", str_timestamp), where("tggl_masuk", "<", end_timestamp), orderBy("tggl_masuk", 'asc')));
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
                6: res.proccess_by ? res.proccess_by : '-',
                7: new Date(res.tggl_masuk.seconds * 1000).toLocaleDateString(),
                8: res.tggl_keluar ? new Date(res.tggl_keluar.seconds * 1000).toLocaleDateString() : '-',
                9: '<span class="badge ' + badge_color + '">' + res.status.toUpperCase() + '</span>',
            }).draw();

            i++;
        });
    }

    exportTableXls = (e) => {
        e.preventDefault();
        $('.chg-size').attr('width', '300');
        $('#test-table-xls-button').click();
        // $('.chg-size').removeAttr('width');
    }

    exportTablePdf = (e) => {
        e.preventDefault();

        var sTable = $('#pdf-table').find('.table').html();
        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "@page { size: landscape; margin: 1cm 0cm 1cm 0cm; }";
        style = style + "</style>";

        var win = window.open('', '', 'height=800,width=1800');

        win.document.write('<html><head>');
        win.document.write('<title>Laporan Data Perbaikan</title>');
        win.document.write(style);
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write('<div><img src="/img/vale-alt.png" alt="image" width="150" height="80" style="position: absolute; left: 80"></div>');
        win.document.write('<h1 style="text-align: center;">PT. Vale Indonesia Tbk</h1>');
        win.document.write('<h4 style="text-align: center;">Departement IT (Information Tecnology)</h2>');
        win.document.write('<h4 style="text-align: center; margin-top: 40px;">Laporan Data Perbaikan</h4>');
        win.document.write('<table style="margin-top: 10px;">' + sTable + '</table>');
        win.document.write('<br><br>PT Vale Indonesia Tbk<br>');
        win.document.write('Jakarta &emsp;&nbsp;: The Energy Building, 31st SCBD Lot 11A Jl. Jend. Sudirman kav. 52-\ - 53 Jakarta 12190, Indonesia.<br>');
        win.document.write('&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;Telp. 021 - 5249000, Fax. 021 - 5249020 <br> ');
        win.document.write('Makassar &nbsp;: Jl. Somba Opu No. 281, Makassar 90001, Indonesia. Telp. (62)411 873 731, Fax. (62) 411 856 157 <br> ');
        win.document.write('Sorowako : Plant Site Sorowako, Kabupaten Luwu Timur, Sulawesi Selatan, Indonesia. Telp. (62)21 524 9100, Fax. (62) 21 524 9565<br> ');
        win.document.write('</body></html>');
        win.document.close();
        win.print();
        win.close();

    }

    render() {
        var d = new Date();
        var m = ('0' + (d.getMonth() + 1)).slice(-2);
        var this_month = d.getFullYear() + '-' + m;
        return (
            <div>
                <Layout active="laporan">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Laporan</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Laporan</h3>
                                            <div className="btn-group pull-right">
                                                <button className="btn btn-danger dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bars" /> Export Data</button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="#!" data-file="excel" onClick={this.exportTableXls} ><img src="/img/icons/xls.png" width={24} /> XLS</a>
                                                    </li>
                                                    <li>
                                                        <a href="#!" data-file="pdf" onClick={this.exportTablePdf}><img src="/img/icons/pdf.png" width={24} /> PDF</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="download-table-xls-button btn btn-link"
                                                table="dataTable"
                                                filename="laporan-perbaikan"
                                                sheet="laporan-perbaikan"
                                                buttonText="XLS"
                                            />
                                        </div>

                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <label>Pilih Priode Laporan</label>
                                                    <input type="month" id="set-month" className="form-control" defaultValue={this_month} />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="table-responsive" id="pdf-table">
                                                <table className="table" id="dataTable">
                                                    <thead>
                                                        <tr hidden>
                                                            <th className='text-center' colSpan={10}>
                                                                <h2 className=''>PT. Vale Indonesia Tbk.</h2>
                                                            </th>
                                                        </tr>
                                                        <tr hidden>
                                                            <th className='text-center' colSpan={10}>
                                                                <span>Departement IT (Information Tecnology)</span>
                                                            </th>
                                                        </tr>
                                                        <tr hidden>
                                                            <th className='text-center' colSpan={10}>
                                                                <br />
                                                                <br />
                                                                <h3>Laporan Data Perbaikan</h3>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th>No</th>
                                                            <th width="200" className='chg-size'>B/N</th>
                                                            <th width="300" className='chg-size'>Nama Pegawai</th>
                                                            <th width="300" className='chg-size'>Nama Device</th>
                                                            <th width="300" className='chg-size'>Nomor Series</th>
                                                            <th width="300">Problem</th>
                                                            <th width="300" className='chg-size'>Ditangani Oleh</th>
                                                            <th width="300" className='chg-size'>Tggl Masuk</th>
                                                            <th width="300" className='chg-size'>Tggl Keluar</th>
                                                            <th width="120">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                    <tfoot hidden>
                                                        <tr>
                                                            <td colSpan={10}></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={10}>
                                                                PT Vale Indonesia Tbk<br />
                                                                Jakarta &emsp;&nbsp;: The Energy Building, 31st SCBD Lot 11A Jl. Jend. Sudirman kav. 52-\ - 53 Jakarta 12190, Indonesia.<br />
                                                                &emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;Telp. 021 - 5249000, Fax. 021 - 5249020 <br />
                                                                Makassar &nbsp;: Jl. Somba Opu No. 281, Makassar 90001, Indonesia. Telp. (62)411 873 731, Fax. (62) 411 856 157 <br />
                                                                Sorowako : Plant Site Sorowako, Kabupaten Luwu Timur, Sulawesi Selatan, Indonesia. Telp. (62)21 524 9100, Fax. (62) 21 524 9565<br />
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END DEFAULT DATATABLE */}

                                </div>
                            </div>

                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}