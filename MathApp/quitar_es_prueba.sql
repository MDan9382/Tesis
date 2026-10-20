-- =====================================================================
-- Elimina las columnas Ejercicio_EsPrueba y Prueba_EsPrueba, que no se usan.
-- Ejecutar DESPUÉS de publicar el backend actualizado (el anterior las lee
-- y fallaría sin ellas). Se puede ejecutar más de una vez sin error.
-- =====================================================================
SET @sql = IF(EXISTS(SELECT 1 FROM information_schema.COLUMNS
                     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Ejercicios' AND COLUMN_NAME = 'Ejercicio_EsPrueba'),
              'ALTER TABLE Ejercicios DROP COLUMN Ejercicio_EsPrueba',
              'SELECT ''Ejercicio_EsPrueba ya no existe'' AS Aviso');
PREPARE paso FROM @sql; EXECUTE paso; DEALLOCATE PREPARE paso;

SET @sql = IF(EXISTS(SELECT 1 FROM information_schema.COLUMNS
                     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Pruebas' AND COLUMN_NAME = 'Prueba_EsPrueba'),
              'ALTER TABLE Pruebas DROP COLUMN Prueba_EsPrueba',
              'SELECT ''Prueba_EsPrueba ya no existe'' AS Aviso');
PREPARE paso FROM @sql; EXECUTE paso; DEALLOCATE PREPARE paso;

SHOW COLUMNS FROM Ejercicios;
SHOW COLUMNS FROM Pruebas;
