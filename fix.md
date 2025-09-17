Now complete the System please

Go through Controllers.md, Models.md and ApiGuide.md

and fix this below

1. on the loging page, the forgot password, below is the endpoints guid 

First Acess the forgot password endponts, 
 @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            userService.initiatePasswordReset(email);
            return ResponseEntity.ok("Password reset link has been sent to your email.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

where buy give user a form to enter the email address that needs to be reset the password. and then when the email is sent  use this 
@PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");
            userService.resetPassword(token, newPassword);
            return ResponseEntity.ok("Password has been reset successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    } to reset the password where by the must verfy in the email box, and after that when they verify give them a form to put in a new password and comfirm and than click login,  the url sent in the email it can use the localhost:8080 for the front end web its fine if possible.

This needs to Apply to both login pages please.
2. On the artist panel under Profiles 
Marital Status and members category is not bieng pulled. 
use this controllers please

model for MemberCategory

package com.example.musicroyalties.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member_categories")
public class MemberCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String categoryName;//Composer, Author, Arranger
}

model for MaritalStatus

package com.example.musicroyalties.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "marital_status")
public class MaritalStatus {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String statusName;
}

model for BankName

package com.example.musicroyalties.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bank_names")
public class BankName {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String bankName;
}

controllers

controller for MaritalController

package com.example.musicroyalties.controllers.lookupControllers;

import com.example.musicroyalties.models.MaritalStatus;
import com.example.musicroyalties.services.lookupservices.MaritalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/martial")
@RestController
@CrossOrigin(origins = "*")
public class MaritalController {
    @Autowired
    private MaritalService  maritalService;

    //Post
    @PostMapping("/post")
    public MaritalStatus createM(@RequestBody MaritalStatus maritalStatus) {
        return maritalService.saveM(maritalStatus);
    }

    //get All
    @GetMapping("/all")
    public List<MaritalStatus> getthemALL() {

        return maritalService.getAllM();
    }

    //get by id
    @GetMapping("/{id}")
    public Optional<MaritalStatus> getM(@PathVariable Long id) {
        return maritalService.getM(id);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public void deleteM(@PathVariable Long id) {
        maritalService.deleteM(id);
    }

    //update
    @PutMapping("/update/{id}")
    public MaritalStatus updateM(@RequestBody MaritalStatus maritalStatus, Long id) {
        maritalStatus.setId(id);
        return maritalService.updateM(maritalStatus);
    }
}

controller for MemberController

package com.example.musicroyalties.controllers.lookupControllers;

import com.example.musicroyalties.models.MemberCategory;
import com.example.musicroyalties.services.lookupservices.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "*")
public class MemberController {
    @Autowired
    private MemberService memberService;

    //Post
    @PostMapping("/post")
    public MemberCategory  createM(@RequestBody MemberCategory memberCategory) {
        return memberService.saveMember(memberCategory);
    }
    //Get All
    @GetMapping("/{id}")
    public Optional<MemberCategory> findById(@PathVariable Long id){
        return memberService.findById(id);
    }
    //Get All
    @GetMapping("/all")
    public List<MemberCategory> findAll(){
        return memberService.findByCate();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteM(@PathVariable Long id){
        memberService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public MemberCategory updateM(@PathVariable Long id, @RequestBody MemberCategory memberCategory){
        memberCategory.setId(id);
        return memberService.saveMember(memberCategory);
    }
}

controller for BankNameController

package com.example.musicroyalties.controllers.lookupControllers;

import com.example.musicroyalties.models.BankName;
import com.example.musicroyalties.services.lookupservices.BankNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bankname")
public class BankNameController {
    @Autowired
    private BankNameService bankNameService;
    
    //post
    @PostMapping("/post")
    public BankName createBankName(@RequestBody BankName bankName) {
        return bankNameService.saveBankName(bankName);
    }
    
    //get all
    @GetMapping("/all")
    public List<BankName> getAllBankName() {
        return bankNameService.findAllBankName();
    }
    //Get by Id
    @GetMapping("/{id}")
    public Optional<BankName> findBankNameById(@PathVariable Long id) {
        return bankNameService.findBankNameById(id);
    }

    //Delete by Id
    @DeleteMapping("/delete/{id}")
    public void deleteBankNameById(@PathVariable Long id) {
        bankNameService.deleteBankNameById(id);
    }
    //update
    @PutMapping("/update/{id}")
    public BankName updateBankName(@PathVariable Long id, @RequestBody BankName bankName) {
        bankName.setId(id);
        return bankNameService.updateBankName(bankName);
    }

}



Make sure also that in the form all endpoints are used get and post methods for the drop down menus.

3. When Artist submit the Form the IPI_number field should not be there and the Notes field should not be there becuase they are update by the admin upon the approval of thier profiles see the flow in ApiGuide.me

4. Uploading Artist work or Music.
the upload type and Work type is not bieng pulled Please use the controllers below also look into .md file for guidanace 
 Model for upload type
package com.example.musicroyalties.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "artist_upload_types")
public class ArtistUploadType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String typeName;
}

model for work type
package com.example.musicroyalties.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "artist_work_types")
public class ArtistWorkType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String workTypeName;//// e.g Pop, Jazz, Gospel, etc
}

Controller for ArtistUploadtype
package com.example.musicroyalties.controllers.lookupControllers;

import com.example.musicroyalties.models.ArtistUploadType;
import com.example.musicroyalties.repositories.ArtistUploadTypeRepository;
import com.example.musicroyalties.services.lookupservices.ArtistUploadTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/uploadtype")
public class ArtistUploadTypeController {
    @Autowired
    private ArtistUploadTypeService art;

    //posting
    @PostMapping("/post")
    public ArtistUploadType postUpload(@RequestBody ArtistUploadType artistUploadType) {
        return art.postType(artistUploadType);

    }

    //get all
    @GetMapping("/all")
    public List<ArtistUploadType> getEverything() {
        return art.getArtistUploadTypes();
    }

    //get by Id
    @GetMapping("/{id}")
    public Optional<ArtistUploadType> getById(@PathVariable Long id) {
        return art.getArtistUploadTypeById(id);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id) {
        art.deleteArtistUploadTypeById(id);
    }

    //update
   @PutMapping("/update/{id}")
    public ArtistUploadType updateType(@PathVariable Long id, @RequestBody ArtistUploadType artistUploadType) {
        artistUploadType.setId(id);
        return art.updateUpload(artistUploadType);
   }


}

controller for ArtistWorkType
package com.example.musicroyalties.controllers.lookupControllers;

import com.example.musicroyalties.models.ArtistWorkType;
import com.example.musicroyalties.services.lookupservices.ArtistUploadTypeService;
import com.example.musicroyalties.services.lookupservices.ArtistWorkTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/worktype")
public class ArtistWorkTypeController {
    @Autowired
    private ArtistWorkTypeService type;

    //Post maping
    @PostMapping("/post")
    public ArtistWorkType post(@RequestBody ArtistWorkType artistWorkType) {
        return type.postType(artistWorkType);
    }
    //get All
    @GetMapping("/all")
    public List<ArtistWorkType> findAll() {
        return type.getAllWorkTypes();
    }
    //get By Id
    @GetMapping("/{id}")
    public Optional<ArtistWorkType> findById(@PathVariable Long id) {
        return  type.findWorkType(id);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id) {
        type.deleteById(id);
    }

    //update
    @PutMapping("/update/{id}")
    public ArtistWorkType updateType (@PathVariable Long id, @RequestBody ArtistWorkType artistWorkType) {
        artistWorkType.setId(id);
        return type.updated(artistWorkType);

    }
}


5. Please not that when Submiting ArtistWork or uploading music. the workId field must not be there and the Notes field must also not be there,  the notes is update by the admin  with 
on admin side the admin will approve with #### 2. Approve Profile
```
POST /api/admin/profile/approve/{memberId}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
    "ipiNumber": "IPI123456789"
}

and reject with 
```
POST /api/admin/profile/reject/{memberId}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
    "notes": "Missing required documents"
}
```

the admin in the action tap they will indicate either approve or reject and use those endpoints

for music aprroval
#### 5. Approve Music
```
POST /api/admin/music/approve/{musicId}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
    "isrcCode": "ISRC123456789"
}
```
and
#### 6. Reject Music
```
POST /api/admin/music/reject/{musicId}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
    "notes": "Audio quality too low"
}

6. Documents Upload must be uploaded individually, i must not have one button for upload, Each upload must have its own button for upload, own button for updating the document and own button to view documents individually.
7. for Music upload have a edit button and delete and use the controllers and endpoints given in the .md files
8. for Change password use the same logic for the reset password process.
9. Finish the whole system for Artist Panel


on the Company Panel
1. on Brown Music Page fox the Create Logsheet button its saying Oops! Page not found

Return to Home
2. companies should also reset passowrd on the login page and also,in the dashboard same thing.

for Admin Panel
1. on the License Application page nothing is display pull the submited forms please and categorise them into 2 (Legal Entiry and Natural Person)
model
package com.example.musicroyalties.models.license;

import com.example.musicroyalties.models.Tittle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="legalEntity")
public class LegalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String CompanyName;
    private String CompanyShortName;//e.g NBC
    private String RegistrationNumber;
    private String VATStatus;
    private String VATNumber;
    //owners Contact information
    private String OwnerFirstName;
    private String OwnerLastName;
    private String OwnerEmail;
    private String OwnerPhone;
    @ManyToOne
    @JoinColumn(name="title_id")
    private Tittle OwnerTitle;
    private int NumberOfPremises;
    private String BuildingName;
    private String UnitNoOrShop;
    private String Street;
    private String Suburb;
    private String CityOrTown;
    private String Country;
    private String PostalCode;
    @ManyToOne
    @JoinColumn(name="musicusage_id")
    private MusicUsageTypes musicUsageType;
    @ManyToOne
    @JoinColumn(name="sourceofmusic_id")
    private SourceOfMusic sourceOfMusic;

}
package com.example.musicroyalties.models.license;

import com.example.musicroyalties.models.Tittle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="NaturalPersonEntity")
public class NaturalPersonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Surnam;
    private String FirstName;
    private int IdNumber;
    @ManyToOne
    @JoinColumn(name="tittle_id")
    private Tittle Title;
    private String BusinessRoleOrTittle;
    private String Email;
    private String Phone;
    private String Fax;
    //address
    private String AddressLocation;
    private String UnitNo;
    private String CityOrTown;
    private String Suburb;
    private String Province;
    private String Country;
    private String PostalCode;
    private String Street;
    //Details of the Premises
    private int NumberOfPremises;
    private LocalDate CommencementDate;
    private String TradingNameOfBusiness;
    @ManyToOne
    @JoinColumn(name="musicusage_id")
    private MusicUsageTypes musicUsageType;

    //source of music
    @ManyToOne
    @JoinColumn(name="sourceofmusic")
    private SourceOfMusic sourceOfMusic;

}

conttrollers
package com.example.musicroyalties.controllers.licenseController;

import com.example.musicroyalties.models.license.LegalEntity;
import com.example.musicroyalties.services.licenseService.LegalEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/legalentity")
public class LegalEntityController {
    @Autowired
    private LegalEntityService legalEntityService;

    //post
    @PostMapping("/post")
    public LegalEntity createLegalEntity(@RequestBody LegalEntity legalEntity) {
        return legalEntityService.saveLegal(legalEntity);
    }

    //get all
    @GetMapping("/all")
    public List<LegalEntity> getAllLegalEntities() {
        return legalEntityService.findAll();
    }
    //get by Id
    @GetMapping("/{id}")
    public Optional<LegalEntity> getLegalEntityById(@PathVariable Long id) {
        return legalEntityService.findById(id);
    }

    //delete
    @DeleteMapping("/{id}")
    public void deleteLegalEntityById(@PathVariable Long id) {
        legalEntityService.deleteById(id);
    }
}

package com.example.musicroyalties.controllers.licenseController;

import com.example.musicroyalties.models.license.NaturalPersonEntity;
import com.example.musicroyalties.services.licenseService.NaturalPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/naturalperson")
public class NaturalPersonController {
    @Autowired
    private NaturalPersonService naturalPersonService;

    //post
    @PostMapping("/post")
    public NaturalPersonEntity createNaturalPerson(@RequestBody NaturalPersonEntity naturalPersonEntity) {
        return naturalPersonService.save(naturalPersonEntity);
    }

    //get all
   @GetMapping("/all")
    public List<NaturalPersonEntity> getAllNaturalPerson() {
        return naturalPersonService.findAll();
   }

   @GetMapping("/{id}")
    public Optional<NaturalPersonEntity> getNaturalPersonById(@PathVariable Long id) {
        return naturalPersonService.findById(id);
   }

   //delete

    @DeleteMapping("/{id}")
    public void deleteNaturalPersonById(@PathVariable Long id) {
        naturalPersonService.deletebyId(id);
    }
}


2. for Approval and Rejections of Music and Profiles use the ApiGuide.md please
3. For the Tab All Artist Under management Section fetch all users who are artist as role and fecth more of thier details like fecth all of thier details in the model below

package com.example.musicroyalties.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member_details")
public class MemberDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="Tittle_id")
    private Tittle tittle;
    @Column(nullable = false)
    private String firstName;

    //tittle

    
    @Column(nullable = false)
    private String surname;

    private int idNumber;

    @Column(unique = true)
    private String ArtistId;
    
    private String pseudonym;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Column(nullable = false)
    private String email;
    
    private String groupNameORStageName;
    
    @ManyToOne
    @JoinColumn(name = "marital_status_id")
    private MaritalStatus maritalStatus;
    
    @ManyToOne
    @JoinColumn(name = "member_category_id")
    private MemberCategory memberCategory;
    
    private Integer noOFDependents;
    
    private String typeOfWork;
    
    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;
    //address details
    private String line1;
    private String line2;
    private String city;
    private String region;
    private String poBox;
    private String postalCode;
    private String country;
    
    private LocalDate birthDate;
    private String placeOfBirth;
    private String idOrPassportNumber;
    private String nationality;
    private String occupation;
    private String nameOfEmployer;
    private String addressOfEmployer;
    
    private String nameOfTheBand;
    private LocalDate dateFounded;
    private Integer numberOfBand;
    
    @ManyToOne
    @JoinColumn(name = "bank_name_id")
    private BankName bankName;
    
    private String accountHolderName;
    private String bankAccountNumber;
    private String bankAccountType;
    private String bankBranchName;
    private String bankBranchNumber;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;
    
    private String IPI_number;
    private String notes;
}
 and display them in the tab All Artist
have search function and get methods and Endpoints are already in the Controllers.md

3. When Editing Users or Company design a proper form and when creating a user or company design a proper form also, the form can be a pop out form an nice one.

4. When Sending Invoice, remove invoice number is is Auto generated and on the int values remove the number 0 in the forms please, and use the 
controllerpackage com.example.musicroyalties.controllers.invoiceControllers;

import com.example.musicroyalties.models.invoiceAndPayments.Invoice;
import com.example.musicroyalties.services.EmailService;
import com.example.musicroyalties.services.invoicesServices.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class InvoiceController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private InvoiceService invoiceService;


    @PostMapping("/send")
    public Invoice  sendInvoice(@Valid @RequestBody Invoice invoice, @RequestParam String clientEmail) throws Exception {
        return invoiceService.send(invoice, clientEmail);

    }

    //get All the Invoices
    @GetMapping("/all")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    //Get By Id
    @GetMapping("/{id}")
    public Optional<Invoice> getInvoice(@PathVariable long id) {
        return invoiceService.getInvoice(id);
    }

}
and this apply to Artist payments 
package com.example.musicroyalties.controllers.invoiceControllers;

import com.example.musicroyalties.models.invoiceAndPayments.ArtistInvoiceReports;
import com.example.musicroyalties.models.invoiceAndPayments.Invoice;
import com.example.musicroyalties.services.EmailService;
import com.example.musicroyalties.services.invoicesServices.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/artistpayments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ArtistInvoiceReports sendInvoice(@Valid @RequestBody ArtistInvoiceReports invoice, @RequestParam String clientEmail) throws Exception {
        return paymentService.send(invoice, clientEmail);

    }

    //Get All
    @GetMapping("/all")
    public List<ArtistInvoiceReports> getAllInvoices() {
        return paymentService.findAll();
    }
    //Get By Id
    @GetMapping("/{id}")
    public Optional<ArtistInvoiceReports> getInvoice(@PathVariable long id) {
        return paymentService.findById(id);
    }
}

am sure you already have the models
package com.example.musicroyalties.models.invoiceAndPayments;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="artistinvoicesreports")
public class ArtistInvoiceReports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentId;

    private String ArtistName;
    private String ArtistPhoneNumber;
    private String ArtistEmail;
    private String ArtistId;
    private String Desciption;
    private String paymentDate;

    // Company (Sender) Details
    private String companyAddress;
    private String companyPhone;
    private String companyEmail;
    private String contactPerson;

    private Double totalplayed;
    private Double UnitPrice;
    private Double TotalEarned;
    private Double TotalNetpaid;

    //Artist Bank Account
    private String BankName;
    private int AccountNumber;
    private String branchName;
    private LocalDate datecreated;

}
 in the form dont nclude paymentId its auto generated

same for this too
// src/main/java/com/example/musicroyalties/models/invoiceAndPayments/Invoice.java

package com.example.musicroyalties.models.invoiceAndPayments;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Company (Sender) Details
    private String companyAddress;
    private String companyPhone;
    private String companyEmail;
    private String contactPerson;

    // Invoice Info
    private String invoiceNumber;
    private String invoiceDate;

    // Client (Billing To)
    private String billingToCompanyName;
    private String billingToCompanyAddress;
    private String billingToCompanyPhone;
    private String billingToCompanyEmail;

    // Service Details
    private String invoiceServiceType;
    private int totalUsed;
    private Double unitPrice;
    private Double totalAmount;
    private Double totalNetAmount;

    // Bank Details
    private int accountNumber;
    private String bankName;
    private String branchName;
    private LocalDate datecreated;
} dont include invoiceNumber


In the Artist Panel, Artsit cannot update ArtistId and IPI_number also they cannot edit workId and ISRC_code


now please complete the system in full
 

Based on this Complete the system please

Start with forgot Password




