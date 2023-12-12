package com.renewEnergy.Controller;

import org.hibernate.boot.beanvalidation.IntegrationException;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/images")
@CrossOrigin
public class ImageController {

    @PostMapping()
    public ResponseEntity<String> handleImageUpload(@RequestPart("image") MultipartFile imageFile) {
        try {
            // Guardar la imagen en un directorio específico
            String uploadDir = "src/main/resources/images";
            String fileName = imageFile.getOriginalFilename();
            String filePath = uploadDir + "/" + fileName;

            saveToFile(imageFile, filePath);

            return ResponseEntity.ok("Imagen guardada exitosamente");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al guardar la imagen");
        }
    }

    private void saveToFile(MultipartFile file, String filePath) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(file.getBytes());
        }
    }
    

    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IntegrationException {
        // Obtenemos la extensión del archivo
        String fileExtension = getExtension(imageName);

        // Asociamos la extensión con el tipo de contenido
        MediaType mediaType = determineMediaType(fileExtension);

        // Construimos la ruta completa al archivo
        Path imagePath = Paths.get("src/main/resources/images", imageName);

        try {
            // Intentamos crear el flujo de entrada
            InputStream inputStream = Files.newInputStream(imagePath);

            // Devolvemos la imagen con el tipo de contenido adecuado
            Resource imgFile = new InputStreamResource(inputStream);
            return ResponseEntity.ok().contentType(mediaType).body(imgFile);
        } catch (IOException e) {
            // Manejamos la excepción
            e.printStackTrace(); // o puedes manejarla de otra manera, por ejemplo, devolver un ResponseEntity
                                 // con error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String getExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return ""; // No se encontró un punto, la extensión es desconocida
        }
        return filename.substring(lastDotIndex + 1);
    }

    private MediaType determineMediaType(String fileExtension) {
        switch (fileExtension.toLowerCase()) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG;
            case "png":
                return MediaType.IMAGE_PNG;
            case "gif":
                return MediaType.IMAGE_GIF;
            // Agrega otros tipos de contenido según sea necesario
            default:
                return MediaType.APPLICATION_OCTET_STREAM; // Tipo de contenido predeterminado
        }
    }
}