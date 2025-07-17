import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const passowrd = [
    {
      plateform: "Email js (mongodb2487@gmail.com)",
      password: "mongodbejs@2487",
      _id: {
        $oid: "680080cece59f6d608314736",
      },
    },
    {
      plateform: "Instagram (aditya_rwt1)",
      password: "Aditya@instagram@24082007@new",
      _id: {
        $oid: "680080e7ce59f6d60831473b",
      },
    },
    {
      plateform: "steam(aditya_rwt1)",
      password: "Adityarawatsteam@24082007",
      _id: {
        $oid: "6801dea902366e80fa314739",
      },
    },
    {
      plateform: "spotify(pubgmobile2487@gmail.con)",
      password: "Adityarawatspotify@24082007",
      _id: {
        $oid: "6801deee6bde20f1ad7c180d",
      },
    },
    {
      plateform: "Riot Games (IvmMaestro/IvMaestro)",
      password: "Adityavalorant@24082007",
      _id: {
        $oid: "6801df276bde20f1ad7c1819",
      },
    },
    {
      plateform: "securoPass (aditya_rwt1)",
      password: "a@24082007",
      _id: {
        $oid: "6801e34e32ffe2b58cbed095",
      },
    },
    {
      plateform: "Adobe (adityarawatnew2487@gmail.com)",
      password: "vPDT4C@%BC.DBcm",
      _id: {
        $oid: "6801e8a228306fd7ebf86f79",
      },
    },
    {
      plateform: "Any desk (adityarawatnew2487@gmail.com)",
      password: "Sp/ur!ttZD*YV2e",
      _id: {
        $oid: "6801ea0a79690d7c57f84811",
      },
    },
    {
      plateform: "bit warden (Ivm_maestro)",
      password: "aditya@mahi@24082007",
      _id: {
        $oid: "6801ea5379690d7c57f84834",
      },
    },
    {
      plateform: "Buddy for study (9244524565)",
      password: "Aditya@24082007",
      _id: {
        $oid: "6801eaa1589b48955ed9e4ef",
      },
    },
    {
      plateform: "Duolingo (adityarawatnew2487@gmail.com)",
      password: "adityarawatduolingo@24082007",
      _id: {
        $oid: "6801eadc79690d7c57f8485a",
      },
    },
    {
      plateform: "Voter List (adityarawatnew2487@gmail.com)",
      password: "Aditya2487@24082007",
      _id: {
        $oid: "6801eb1179690d7c57f84877",
      },
    },
    {
      plateform: "Email js(adityarawatnew2487@gmail.com)",
      password: "yzbUD_ynLb$8c,d",
      _id: {
        $oid: "6801eb7979690d7c57f84896",
      },
    },
    {
      plateform: "expo (aditya_rwt1)",
      password: "adityarawatexpo@24082007",
      _id: {
        $oid: "6801ebc379690d7c57f848b7",
      },
    },
    {
      plateform: "github (adityarawatnew2487@gmail.com)",
      password: "adityarawatgithub@24082007",
      _id: {
        $oid: "6801ec1479690d7c57f848da",
      },
    },
    {
      plateform: "google (bgmi2487@gmail.com)",
      password: "bgmi2487@24082007",
      _id: {
        $oid: "6801ec44589b48955ed9e51c",
      },
    },
    {
      plateform: "google (pubgwp2487@gmail.com)",
      password: "adityawp@24082007",
      _id: {
        $oid: "6801ec7579690d7c57f84900",
      },
    },
    {
      plateform: "hiretech",
      password: "2.N%Wtat8#C&.%M",
      _id: {
        $oid: "6801ecae79690d7c57f84929",
      },
    },
    {
      plateform: "microsoft (adityarawatnew2487@gmail.com)",
      password: "aditya2487microsoft@24082007",
      _id: {
        $oid: "6801ed3d589b48955ed9e545",
      },
    },
    {
      plateform: "mongodb (mongodb2487@gmail.com)",
      password: "mongo@14920251",
      _id: {
        $oid: "6801ed9b79690d7c57f84955",
      },
    },
    {
      plateform: "bhulekh (Aditya_Rawat2487)",
      password: "Adityabhulekh@24082007",
      _id: {
        $oid: "6801edc679690d7c57f84984",
      },
    },
    {
      plateform: "mp online (adityarawatnew2487@gmail.com)",
      password: "Mponline@24082007",
      _id: {
        $oid: "6801ee0779690d7c57f849b5",
      },
    },
    {
      plateform: "oracle (adityarawatnew2487@gmail.com)",
      password: '9c.FYRf6"Z=*S57',
      _id: {
        $oid: "6801ee3579690d7c57f849e8",
      },
    },
    {
      plateform: "scholar ship (MP202324000231180)",
      password: "Aditya@24082007",
      _id: {
        $oid: "6801ee8079690d7c57f84a1d",
      },
    },
    {
      plateform: "unity (adityarawatnew2487@gmail.com)",
      password: "Ry&-V&7v.Ay579G",
      _id: {
        $oid: "6801eee5589b48955ed9e592",
      },
    },
    {
      plateform: "well found (adityarawatnew2487@gmail.com)",
      password: "w9vnQf3xSS.=%jH",
      _id: {
        $oid: "6801ef13589b48955ed9e5cb",
      },
    },
    {
      plateform: "facebook (pubgwp2487@gmail.com)",
      password: "adityabgmiloginwithfacebook@24082007",
      _id: {
        $oid: "6801ef77589b48955ed9e606",
      },
    },
    {
      plateform: "twitter (bgmi2487@gmail.com)",
      password: "aditya2487@24082007@bgmi",
      _id: {
        $oid: "6801efa879690d7c57f84a57",
      },
    },
    {
      plateform: "twitter (darklost_pk)",
      password: "adityatwitterpk@24082007",
      _id: {
        $oid: "6801efd2589b48955ed9e644",
      },
    },
    {
      plateform: "auth 0 (dev-0drbcgiyl1yzya0f)",
      password: "dev-0drbcgiyl1yzya0f",
      _id: {
        $oid: "6805bb8fc2f90b17ad5edaa2",
      },
    },
    {
      plateform: "geolocation (aditya_rwt1)",
      password: "adityarawatgeolocation@24082007",
      _id: {
        $oid: "6807607203d693dc4d49bf6b",
      },
    },
    {
      plateform: "amazon 9244524565",
      password: "MG-KFa4xpH",
      _id: {
        $oid: "68281c94fa1469737bd03993",
      },
    },
    {
      plateform: "Razer Mouse",
      password: "razeraditya@24082007",
      _id: {
        $oid: "682981ee4a8d07e4b5f2d8b7",
      },
    },
    {
      plateform: "google (pubgmobile24487@gmail.com)",
      password: "adityarawatfirstgamingid@24082007",
      _id: {
        $oid: "682ad8b03ada0ab7bc84cbee",
      },
    },
    {
      plateform: "pnb",
      password: "R46383919",
      _id: {
        $oid: "6832f02eec755adae232d70d",
      },
    },
    {
      plateform: "githubMongoDb",
      password: "mongodb2487@24082007",
      _id: {
        $oid: "68343f115130c046402ddb92",
      },
    },
    {
      plateform: "PostManApi",
      password: "adityapostman@24082007",
      _id: {
        $oid: "68348a90b6343216415842ff",
      },
    },
    {
      plateform: "PaymentGatewatUpi",
      password: "4Gj#Gg@M6SHaAq@",
      _id: {
        $oid: "683bc85e20da480e90fcde69",
      },
    },
    {
      plateform: "upiGateway",
      password: "yXss",
      _id: {
        $oid: "683fe77ad54386b0e706f154",
      },
    },
    {
      plateform: "JuspayPaymentGateway",
      password: "2FpcLm@drmC5wQG",
      _id: {
        $oid: "6844f6e0ddb62593d3a17cf4",
      },
    },
    {
      plateform: "JuspayMerchatId",
      password: "S9NTQY0T0O",
      _id: {
        $oid: "6844f7beddb62593d3a17d46",
      },
    },
    {
      plateform: "googlemongodb",
      password: "mongodb2487@24082007",
      _id: {
        $oid: "68515c8d72f183b3373ccfc1",
      },
    },
  ];

  const authdata = await currentUser();
  const username = authdata?.username;

  
  return <div>page</div>;
};

export default page;
